const mongoose = require("mongoose");


const planSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "please add a title"],
    },
    plan_id:{
        type: String,
        required: [true, "please add a plan_id"],
    },
    plan_type:{
        type: String,
        required: [true, "please add a type"],
    },
    price: {
        type: Number,
        required: [true, "please add a price"],
        maxLength: 20
    },
    pros: {
        type: Array,
        required: true,
        default: []
    },
}, { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);
