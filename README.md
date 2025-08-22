# Real-time Chat App (Socket.IO + React + Vite + Express) 💬⚡️

A simple real-time chat application. Users join with a username, see who is online, send messages, and receive system notifications when users join or leave. 🚀

## Features ✨
- 👤 Join chat with a username
- 🔁 Real-time messaging powered by Socket.IO
- 👥 Online users list auto-updates on join/leave
- 🛈 System messages for join/leave events
- 🔌 Clean connect/disconnect lifecycle

## Tech Stack 🛠️
- 🖥️ Backend: Node.js, Express, Socket.IO, CORS
- 🧩 Frontend: React, Vite, socket.io-client
- 📦 Tooling: npm

## Project Structure 📁
```
chatApp-Socket.io/
├─ backend/
│  └─ index.js
├─ frontend/
│  ├─ vite.config.js
│  └─ src/
│     └─ components/
│        └─ ChatApp.jsx
└─ README.md
```

## Prerequisites ✅
- Node.js >= 18
- npm >= 9

## Setup ⚙️
### 1) Backend 🔧
```bash
cd backend
# install dependencies (if package.json exists)
npm install
# otherwise, install directly
# npm install express socket.io cors

# run the server
node index.js
```
- The server defaults to port 5000.
- CORS is configured to allow http://localhost:5173 by default.

### 2) Frontend 💻
```bash
cd frontend
npm install
npm run dev
```
- Vite dev server runs on http://localhost:5173 by default.

## Configuration 🔧
You can adjust ports and origins as needed.
- Backend environment variables (optional):
  - `PORT` (default: 5000)
  - `CLIENT_ORIGIN` (default: http://localhost:5173)

> Note: The frontend currently connects to `http://localhost:5000` in code. If you change the backend port, update the socket URL in `frontend/src/components/ChatApp.jsx` accordingly. 🔄

## Running the App ▶️
1. Start the backend: `node backend/index.js`
2. Start the frontend: `cd frontend && npm run dev`
3. Open your browser at `http://localhost:5173` 🌐
4. Enter a username and join the chat ✍️

## Usage 🗣️
- Messages appear in real-time for all connected users.
- Online users list updates automatically.
- System messages announce when users join or leave.
- Use the Logout button to disconnect and clear local state. 🔕

## Socket Events 🔌
- Client ➜ Server
  - `join`: payload `username: string`
  - `sendMessage`: payload `{ username: string, message: string }`

- Server ➜ Client
  - `users`: payload `string[]` (list of current usernames)
  - `message`: payload `{ username: string, message: string }`
    - System messages use `username: "System"`. 🧭

## Notes and Suggested Improvements 💡
- Use environment variables to avoid hardcoded URLs/ports.
- Consider adding a `type` field to messages (e.g., `system`, `chat`) for more reliable UI styling.
- Optionally enforce unique usernames on the server.
- For production, secure Express with common middleware (helmet, rate limiting), and serve over HTTPS. 🔐

## Troubleshooting 🆘
- CORS errors: Ensure backend `CLIENT_ORIGIN` matches your frontend URL.
- Port already in use: Adjust `PORT` for backend or Vite's dev server port.
- Socket version mismatch: Ensure `socket.io` and `socket.io-client` are the same major version (e.g., v4). 🔍

## License 📝
MIT
