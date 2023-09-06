const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subscriptionID: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true, // basic, premium, etc.
    },
    startDate: {
        type: Date,
        required: true
    },
    nextPaymentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'active' // can be 'inactive', 'lapsed', etc.
    }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
