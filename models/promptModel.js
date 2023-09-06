const mongoose = require("mongoose");


const promptSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "please add a title"],
        minLength: 2,
        maxLength: 100
    },
    topics: {
        type: Array,
        required: [true, "please add topics"],
        minLength: 2,
        maxLength: 100
    },
    description: {
        type: String,
        required: [true, "please add a description"],
        minLength: 2
    },
    template: {
        type: String,
        required: [true, "please add a template"],
        minLength: 2
    },
    hashtags:{
        type: Array,
        required:false
    },
    createdBy: {
        type: String,
        default: "guest"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    savedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    price: {
        type: Number,
        required: false
    },
    isForSale: {
        type: Boolean,
        default: false
    },
    purchasedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],    
    votedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    usedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isFolder: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("Prompt", promptSchema);
