const { Message } = require("../models/Message");

async function sendHistory(socket, limit = 50) {
    const historyRows = await Message.findAll({
        order: [["created_at", "DESC"]],
        limit,
        attributes: ["username", "message", "created_at"],
        raw: true,
    });
    const history = historyRows.map((r) => ({ username: r.username, message: r.message }));
    socket.emit("history", history);
}

async function saveMessage({ username, message }) {
    await Message.create({ username, message });
}

async function clearHistory() {
    await Message.destroy({ where: {} });
}

module.exports = { sendHistory, saveMessage, clearHistory };


