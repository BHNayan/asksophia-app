const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");

const createComment = asyncHandler(async (req, res) => {
  const { text, promptId } = req.body;

  const comment = new Comment({
    text,
    user: req.user._id,
    prompt: promptId,
  });

  const createdComment = await comment.save();
  res.status(201).json(createdComment);
});

const getCommentsForPrompts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = 5;
  const skip = (page - 1) * pageSize;
  const promptId = req.params.promptId;
  const comments = await Comment.find({ prompt: promptId })
    .populate("user", "username img_url")
    .skip(skip)
    .limit(pageSize + 1)
    .sort({ createdAt: -1 });

  const hasMore = comments.length > pageSize;

  if (hasMore) comments.pop();

  res.status(200).json({ comments, hasMore });
});

const updateComment = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const { text } = req.body;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // Ensure that the user updating the comment is the owner of the comment
  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("User not authorized");
  }

  comment.text = text;
  await comment.save();
  
  const updatedComment = await Comment.findById(commentId).populate("user", "username img_url");

  res.status(200).json(updatedComment);
});

const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // Ensure that the user deleting the comment is the owner of the comment
  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("User not authorized");
  }

  await comment.remove();
  res.status(200).json({ message: "Comment deleted" });
});

module.exports = {
  createComment,
  getCommentsForPrompts,
  updateComment,
  deleteComment,
};
