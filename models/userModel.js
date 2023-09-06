const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please add a name"],
        minLength: 4,
        maxLength: 60
    },
    img_url: {
        type: String,
        required: false,
        default:null
    },
    email: {
        type: String,
        required: [true, "please add your email"],
        minLength: 4,
        maxLength: 190
    },
    password: {
        type: String,
        required: [true, "please add your password"],
        minLength: 8,
        maxLength: 100
    },
    plan:{
        type: String,
        required: false,
        default:"free" // basic, premium
    },
    subscriptionID:{
        type: String,
        required: false,
    },
    words:{
        type: Number,
        required: true,
        default:7500
    },
    genratedImages:{
        type: Number,
        required: true,
        default:15
    },
    paypalAccountEmail: {
        type: String,
        required: false
    },
    isPaypalConnected: {
        type: Boolean,
        default: false
    },
    numberofPosts:{
        type: Number,
        required: true,
        default:2000
    },
    status:{
        type: String,
        required: true,
        default:"active" //desactivated
    },
    role:{
        type: String,
        required: true,
        default:"guest" //admin
    },
    bio: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 300,
        default:null
    },
    website: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 100,
        default:null
    },
    twitter: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 100,
        default:null
    },
    discord: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 100,
        default:null
    },
    instagram: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 100,
        default:null
    },
    github: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 100,
        default:null
    },
    facebook: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 100,
        default:null
    },
    tiktok: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 100,
        default:null
    },
    verified: {
		type: Boolean,
		default: false
	},
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    currentAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
