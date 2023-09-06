const asyncHandler = require("express-async-handler");
const Tone = require("../models/toneModel");

// @desc   Post a tone
// @route  POST /api/tone
// @access  Public
const postTone = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
    const newTone = await Tone.create( req.body );
    res.status(200).json(newTone);
});

// @desc   Get all tones
// @route  GET /api/tone
// @access  Public
const getTones = asyncHandler(async (req, res) => {
 try {
    let tones = await Tone.find()
        .sort({ createdAt: -1 });

      if (!tones) {
        res.status(401);
        throw new Error("No tones found");
    }

    return res.status(200).json(tones);
 } catch (error) {
        console.log(error)
        res.status(401);
        throw new Error("Error");
 }
});


// @desc   Get one tone
// @route  GET /api/tones/:id
// @access  Public
const getOneTone = asyncHandler(async (req, res) => {
    const tone = await Tone.findById(req.params.id);
    if (!tone) {
        res.status(401);
        throw new Error("No tone found with this ID");
    }
    return res.status(201).json(tone);
});



// @desc   update tone
// @route  PUT /api/tones
// @access  Public
const putTone = asyncHandler(async (req, res) => {
    const tone = await Tone.findById(req.params.id);
    if (!tone) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
        const updateTone = await Tone.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updateTone);
    
});

// @desc   DELETE tone
// @route  DELETE /api/tone/:id
// @access  Public
const deleteTone = asyncHandler(async (req, res) => {
    const tone = await Tone.findById(req.params.id);
    if (!tone) {
        res.status(401);
        throw new Error("No tone with this ID");
    }
    await tone.remove();
    res.status(201).json({ message: "the tone is deleted successfully" });
   
});

module.exports = {
    getTones,
    getOneTone,
    postTone,
    putTone,
    deleteTone,
}