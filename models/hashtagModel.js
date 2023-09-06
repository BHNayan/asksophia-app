const mongoose = require("mongoose");


const hashtagSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "please add a title"],
        minLength: 2,
        maxLength: 100
    },
    name: {
        type: String,
        required: false,
        maxLength: 60,
    },
    color: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
        }
}, { timestamps: true });

module.exports = mongoose.model("Hashtag", hashtagSchema);
