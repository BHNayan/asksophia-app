const mongoose = require("mongoose");


const purchaseSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    prompt: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' },
    pricePaid:{type:Number, required:true},
    transactionDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Purchase", purchaseSchema);
