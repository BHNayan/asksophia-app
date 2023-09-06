const mongoose = require("mongoose");


const toneSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "please add a title"],
    },
    description:{
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("Tone", toneSchema);
