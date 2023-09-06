const mongoose = require("mongoose");


const projectSchema = mongoose.Schema({
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
    url:{
        type: String,
        minLength: 2,
        maxLength: 100
    },
    response: {
        type: String,
        required: false,
        default:""
    },
    isFolder: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
