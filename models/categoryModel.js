const mongoose = require("mongoose");


const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "please add a title"],
        minLength: 2,
        maxLength: 100
    },
    icone: {
        type: String,
        required: false,
        maxLength: 60,
        default:'fa-pen-nib'
    },
    text: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 500
        },
    type: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 200,
        default:"personal"
        },
    link: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
        },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
