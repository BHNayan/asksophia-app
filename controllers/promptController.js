const asyncHandler = require("express-async-handler");
const Prompt = require("../models/promptModel");
const User = require("../models/userModel");
const Folder = require("../models/folderModel");

// @desc   Post a prompt
// @route  GET /api/prompts
// @access  Public
const postPrompt = asyncHandler(async (req, res) => {
    const { title, topics, description, template, hashtags, price, isForSale } = req.body;
    let createdBy="guest";

    if (!title || !topics || !description || !template) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
    const user = await User.findById(req.user._id);
    if(req.user.role === "admin"){
        createdBy = "company";
    }
    if(!user){
        res.status(401);
        throw new Error("No user found");
    }
    if(user.numberofPosts <= 0){
        res.status(401);
        throw new Error("You have reached your limit of posts");
    } else {
        
        const newPrompt = await Prompt.create({
            user: req.user.id, isForSale,
            title, topics, hashtags, price:price,
            template, description,createdBy,purchasedBy: [req.user._id],
        });
        user.numberofPosts = user.numberofPosts - 1;
        res.status(200).json(newPrompt);
    }
    
});

// @desc   Get all prompts
// @route  GET /api/prompts/:topic?
// @route  GET /api/prompts
// @access  Public
// const getPrompts = asyncHandler(async (req, res) => {
//     const page = Number(req.query.page) || 1;
//     const pageSize = Number(req.query.pageSize) || 10;
//     const topic = req.params.topics;
    
//     let queryOptions = { createdBy: "company" };
//     if (topic) {
//         queryOptions = { topics: topic };
//     }

//     const total = await Prompt.countDocuments(queryOptions);
//     const prompts = await Prompt.find(queryOptions)
//         .sort({ createdAt: -1 })
//         .populate('user')
//         .populate('likes')
//         .skip(pageSize * (page - 1))
//         .limit(pageSize);

//     if (!prompts) {
//         res.status(401);
//         throw new Error("No prompts found");
//     }
//     const pages = Math.ceil(total / pageSize);

//     return res.status(200).json({prompts, pages});
// });
const getPrompts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const topic = req.params.topics;
    const order = req.query.order || 'new';

    let queryOptions = { createdBy: "company" };
    if (topic) {
        queryOptions = { topics: topic };
    }

    let prompts = await Prompt.find(queryOptions)
        .sort({ createdAt: -1 })
        .populate('user')
        .populate('likes')
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    if (order === 'likes') {
        prompts.sort((a, b) => b.likes.length - a.likes.length);
    }

    if (!prompts) {
        res.status(401);
        throw new Error("No prompts found");
    }

    const total = await Prompt.countDocuments(queryOptions);
    const pages = Math.ceil(total / pageSize);

    return res.status(200).json({prompts, pages});
});


// @desc   Get user prompts
// @route  GET /api/prompts/user/:id
// @access  Public
const getUserPrompts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 12;
  
    const total = await Prompt.countDocuments({ user: req.params.id });
    const query = {
        user: req.params.id,
        isFolder: false
      };
    
    if (req.user._id.toString() === req.params.id) {
      const prompts = await Prompt.find(query)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

      if (!prompts) {
        res.status(401);
        throw new Error("No prompts found");
      }
      const pages = Math.ceil(total / pageSize);
      return res.status(200).json({ prompts, pages });
    } else {
      res.status(401);
      throw new Error("Unauthorized access");
    }
      
  });

// @desc   Get all prompts saved by a user
// @route  GET /api/user/:id/savedprompts
// @access  Public
const getUserSavedPrompts = asyncHandler(async (req, res) => {
    const prompts = await Prompt.find({ savedBy: req.params.id });
    if (prompts.length > 0) {
        res.status(200).json(prompts);
    } else {
        res.status(400).json({ message: 'No saved prompts for this user' });
    }
});

const totalPrompts = asyncHandler(async (req, res) => {
    const count = await Prompt.countDocuments();
    res.json({total: count});
});

// @desc   Get user prompts
// @route  GET /api/prompts/prompt/:id
// @access  Public
const getOnePrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) {
        res.status(401);
        throw new Error("No Prompt found with this ID");
    }
    return res.status(201).json(prompt);
});

// @desc   Get prompts by tags
// @route  GET /api/prompts/prompt/:id
// @access  Public
const getPromptsByTopic = asyncHandler(async (req, res) => {
    const prompts = await Prompt.find({ topics: req.params.topic }).populate('user');
    if (!prompts) {
        res.status(404);
        throw new Error("No Prompt found with this topic");
    }
    return res.status(201).json(prompts);
});

// @desc   update prompt
// @route  PUT /api/prompts/edit
// @access  Public
const putPrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
    if ((req.user._id.toString() === prompt.user._id.toString()) || req.user.role==="admin") {
        const updatePrompt = await Prompt.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updatePrompt);
    } else {
        res.status(401);
        throw new Error("Unauthorized access");
    }
});

// @desc   Get prompt
// @route  GET /api/prompts
// @access  Public
const deletePrompt = asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) {
        res.status(401);
        throw new Error("No prompt with this ID");
    }
    if ((req.user._id.toString() === prompt.user._id.toString()) || req.user.role==="admin") {

        // Find folders that have this prompt
        const foldersWithPrompt = await Folder.find({ prompts: prompt._id });

        // Remove the prompt reference from each of these folders
        for(let folder of foldersWithPrompt) {
            const index = folder.prompts.indexOf(prompt._id);
            if (index !== -1) {
                folder.prompts.splice(index, 1);
                await folder.save(); // Save the folder back to the database
            }
        }

        // Remove the targeted prompt
        await prompt.remove();

        res.status(201).json({ message: "the prompt is deleted successfully" });
    } else {
        res.status(401);
        throw new Error("Unauthorized access");
    }
});


module.exports = {
    getPrompts,
    getUserPrompts,
    getPromptsByTopic,
    putPrompt,
    getUserSavedPrompts,
    postPrompt,
    totalPrompts,
    getOnePrompt,
    deletePrompt,
}