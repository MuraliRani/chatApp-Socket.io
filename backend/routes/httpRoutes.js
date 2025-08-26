const { Router } = require("express");
const { health, getMessages, postMessage, deleteMessages } = require("../controllers/httpController");

const router = Router();

router.get("/health", health);
router.get("/messages", getMessages);
router.post("/messages", postMessage);
router.delete("/messages", deleteMessages);

module.exports = { router };


