const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tools: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:false
    }],
    prompts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prompt',
        required:false
    }],
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required:false
    }],
    description: {
        type: String,
        default: ''
    },
    folderType: {
        type: String,
        enum: ['project', 'prompt', "chat"],
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Folder', folderSchema);
