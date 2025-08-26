const { Message } = require("../models/Message");
const { clearHistory } = require("./chatController");

function health(req, res) {
    res.json({ status: "ok" });
}

async function getMessages(req, res) {
    try {
        const limit = Number(req.query.limit || 50);
        const rows = await Message.findAll({
            order: [["created_at", "DESC"]],
            limit,
            attributes: ["id", "username", "message", "created_at"],
            raw: true,
        });
        res.json(rows);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
}

async function postMessage(req, res) {
    try {
        const { username, message } = req.body || {};
        if (!username || !message) return res.status(400).json({ error: "username and message required" });
        const created = await Message.create({ username, message });
        const io = req.app.get("io");
        if (io) io.emit("message", { username, message });
        res.status(201).json({ id: created.id });
    } catch (e) {
        res.status(500).json({ error: "Failed to create message" });
    }
}

async function deleteMessages(req, res) {
    try {
        await clearHistory();
        const io = req.app.get("io");
        if (io) io.emit("message", { username: "System", message: "Chat history cleared." });
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ error: "Failed to clear messages" });
    }
}

module.exports = { health, getMessages, postMessage, deleteMessages };


