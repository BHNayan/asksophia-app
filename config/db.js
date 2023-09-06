const mongoose = require("mongoose");
const Tone = require("../models/toneModel");

const connectDB = async () => {
    var uri = `mongodb+srv://${process.env.MONGO_URL_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    try {
        const conn = await mongoose.connect(uri);
        console.log(`mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }

    //  const categories=[
    //     {
    //         "title": "Formal:",
    //         "description": "This tone is professional, polite, and appropriate for business or academic contexts."
    //     },
    //     {
    //         "title": "Informal:",
    //         "description": "This tone is casual and conversational, often used in friendly or familiar contexts."
    //     },
    //     {
    //         "title": "Persuasive:",
    //         "description": "This tone aims to convince the reader or listener to agree with a certain viewpoint."
    //     },
    //     {
    //         "title": "Instructive:",
    //         "description": "This tone is used when giving directions or instructions."
    //     },
    //     {
    //         "title": "Sarcastic:",
    //         "description": "This tone involves saying something but meaning the opposite, often in a humorous or mocking way."
    //     },
    //     {
    //         "title": "Enthusiastic:",
    //         "description": "This tone conveys excitement and energy."
    //     },
    //     {
    //         "title": "Empathetic:",
    //         "description": "This tone shows understanding and sympathy for another's feelings."
    //     },
    //     {
    //         "title": "Authoritative:",
    //         "description": "This tone conveys a sense of leadership or expertise in a subject."
    //     },
    //     {
    //         "title": "Friendly:",
    //         "description": "This tone is warm, kind, and inviting."
    //     }
    // ]
    
    
    // Tone.insertMany(categories, function(err, docs) {
    //     if (err) { 
    //         console.error(err);
    //     } else {
    //        console.log("Multiple documents inserted to Collection");
    //     }
    // });
    // Tags.updateMany({}, { $set: { tag_type: 'library' }}, (err, res) => {
    //     if (err) throw err;
    //     console.log(res.modifiedCount + " documents updated");
    //   });
};

module.exports = connectDB;
