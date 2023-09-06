const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    prompt: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Prompt",
    },
    text: {
        type: String,
        required: [true, "please add a comment"],
        minLength: 1,
        maxLength: 1000
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
