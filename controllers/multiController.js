const asyncHandler = require("express-async-handler");
const Prompt = require("../models/promptModel");


const likePrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt.likes.some(id => id.toString() === req.user._id.toString())) {
        await prompt.updateOne({ $push: { likes: req.user._id } });
        res.status(200).json("The prompt has been liked");
    } else {
        res.status(403).json("You already liked this prompt");
    }
});

const unlikePrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);

    if (prompt.likes.some(id => id.toString() === req.user._id.toString())) {
        await prompt.updateOne({ $pull: { likes: req.user._id } });
        res.status(200).json("The prompt has been unliked");
    } else {
        res.status(403).json("You haven't liked this prompt yet");
    }
});

// @desc   Put a saved prompt
// @route  PUT /api/prompts/:id/saveprompt
// @access  Public
const savePrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt.savedBy.some(id => id.toString() === req.user._id.toString())) {
        await prompt.updateOne({ $push: { savedBy: req.user._id } });
        res.status(200).json({ message: 'Prompt saved' });
    } else {
        res.status(400).json({ message: 'Prompt already saved' });
    }
});


// @desc   unsave prompt
// @route  PUT /api/prompts/:id/unsaveprompt
// @access  Public
const unsavePrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);

    if (prompt.savedBy.some(id => id.toString() === req.user._id.toString())) {
        await prompt.updateOne({ $pull: { savedBy: req.user._id } });
        res.status(200).json({ message: 'Prompt Unsaved' });
    } else {
        res.status(400).json({ message: 'havent saved it yet' });
    }
});
// @desc   Put a saved prompt
// @route  PUT /api/prompts/:id/upvote
// @access  Public
const upvotePrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt.votedBy.some(id => id.toString() === req.user._id.toString())) {
        await prompt.updateOne({ $push: { votedBy: req.user._id } });
        res.status(200).json({ message: 'Prompt voted' });
    } else {
        res.status(400).json({ message: 'Prompt already voted' });
    }
});


// @desc   unsave prompt
// @route  PUT /api/prompts/:id/downvote
// @access  Public
const downvotePrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);

    if (prompt.votedBy.some(id => id.toString() === req.user._id.toString())) {
        await prompt.updateOne({ $pull: { votedBy: req.user._id } });
        res.status(200).json({ message: 'Prompt downvoted' });
    } else {
        res.status(400).json({ message: 'havent upvoted it yet' });
    }
});

// @desc   Put a saved prompt
// @route  PUT /api/prompts/:id/usedby
// @access  Public
const usedByPrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) {
        res.status(404)
        throw new Error("Prompt doesnt exist");
    }
    await prompt.updateOne({ $push: { usedBy: req.user._id } });
    res.status(200).json({ message: 'Prompt voted' });
});


module.exports = {
    likePrompt,
    unlikePrompt,
    savePrompt,
    unsavePrompt,
    upvotePrompt,
    downvotePrompt,
    usedByPrompt
}

