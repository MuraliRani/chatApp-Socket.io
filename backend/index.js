const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { sequelize } = require("./config/db");
const { Message } = require("./models/Message");
const { saveMessage, clearHistory } = require("./controllers/chatController");
const { router: httpRoutes } = require("./routes/httpRoutes");

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.set("io", io);

(async () => {
  try {
    await sequelize.authenticate();
    await Message.sync();
    console.log("Database connected and Message model synced");
  } catch (err) {
    console.error("Database initialization failed", err);
  }
})();

const onlineUsers = new Map();

io.on("connection", async (socket) => {
  socket.on("join", async (username) => {
    socket.data.username = username;
    onlineUsers.set(socket.id, username);
    io.emit("users", Array.from(onlineUsers.values()));

    io.emit("message", {
      username: "System",
      message: `${username} has joined the chat.`,
    });
  });

  socket.on("sendMessage", async (data) => {
    io.emit("message", data);
    try {
      await saveMessage({ username: data.username, message: data.message });
    } catch (err) {
      console.error("Failed saving message", err);
    }
  });

  socket.on("clearHistory", async () => {
    try {
      await clearHistory();
      io.emit("history", []);
      io.emit("message", {
        username: "System",
        message: "Chat history cleared.",
      });
    } catch (err) {
      console.error("Failed to clear history", err);
    }
  });

  socket.on("disconnect", () => {
    const username = socket.data.username;
    if (username) {
      io.emit("message", {
        username: "System",
        message: `${username} has left the chat.`,
      });
    }
    onlineUsers.delete(socket.id);
    io.emit("users", Array.from(onlineUsers.values()));
  });
});

app.use("/", httpRoutes);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
