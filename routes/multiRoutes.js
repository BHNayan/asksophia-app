const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { likePrompt, unlikePrompt,
    savePrompt, unsavePrompt,
    upvotePrompt, downvotePrompt,
    usedByPrompt
} = require("../controllers/multiController");

router.route('/:id/unlike').post(protect, unlikePrompt);
router.route('/:id/like').post(protect, likePrompt);
router.post('/:id/savePrompt', protect, savePrompt);
router.post('/:id/unsavePrompt', protect, unsavePrompt);
router.route('/:id/upvote').put(protect, upvotePrompt);
router.route('/:id/downvote').put(protect, downvotePrompt);
router.route('/:id/usedby').put(protect, usedByPrompt);

module.exports = router;