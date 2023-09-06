const mongoose = require("mongoose");


const tagSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "please add a tag"],
        minLength: 2,
        maxLength: 100
    },
    color: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    bgColor: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    status: {
        type: String,
        required: true,
        minLength: 4,
        default: "active"
    },
    tag_type: {
        type: String,
        required: true,
        minLength: 4,
        default: "library"
    },
}, { timestamps: true });

module.exports = mongoose.model("Tags", tagSchema);