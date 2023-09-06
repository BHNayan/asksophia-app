const express = require("express");
const router = express.Router();
const {
  createComment,
  getCommentsForPrompts,
  updateComment,
  deleteComment,
} = require("../controllers/commentsController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:promptId").post(protect, createComment);
router.route("/:promptId").get(protect, getCommentsForPrompts);
router.route("/:commentId").put(protect, updateComment);
router.route("/:commentId").delete(protect, deleteComment);

module.exports = router;
