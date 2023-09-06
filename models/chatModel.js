const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    conversation: { type: Array, default: [String] },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isFolder:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

module.exports = mongoose.model("Chat", chatSchema);
