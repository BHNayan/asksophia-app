const express = require("express");
const router = express.Router();
const {
  postPrompt,
  saveChat,
  getChats,
  deleteChat,
  getOneChat,
  postChatPrompt,
  exportToWord,
  generateImage,
} = require("../controllers/gptController");
const { protect } = require("../middleware/authMiddleware");

module.exports = function (io) {
  router.use((req, res, next) => {
    req.io = io;
    next();
  });

  router.route("/chatgpt").post(protect, postPrompt);
  router.route("/chat-history/:userId").get(protect, getChats);
  router.route("/chat-history/get/:id").get(protect, getOneChat);
  router.route("/chat-history/:id").delete(protect, deleteChat);
  router.route("/chat-sophia").post(protect, postChatPrompt);
  router.route("/save-chat").post(protect, saveChat);
  router.route("/image").post(protect, generateImage);
  router.route("/export").post(exportToWord);

  return router;
};
