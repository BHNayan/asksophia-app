const mongoose = require("mongoose");


const toolSchema = mongoose.Schema({
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
        minLength: 10,
        maxLength:500
    },
    link: {
        type: String,
        required: true,
        minLength: 2
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    status: {
        type: String,
        required: true,
        minLength: 4,
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("Tool", toolSchema);