const asyncHandler = require("express-async-handler");
const Tool = require("../models/toolModel");

// @desc   Post a tool
// @route  POST /api/tool
// @access  Public
const postTool = asyncHandler(async (req, res) => {
    const { title, text, link } = req.body;
    try {
        if (!title || !text || !link) {
            res.status(401);
            throw new Error("All fields must be filled");
        }
        const newTool = await Tool.create(req.body);
        res.status(200).json(newTool);
    } catch (error) {
        console.log(error)   
    }
});

// @desc   Get all tools
// @route  GET /api/tool
// @access  Public
const getTools = asyncHandler(async (req, res) => {
 try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize) || 10;
    let tools = null;

    const total = await Tool.countDocuments();
    if(!page){
        tools = await Tool.find()
        .populate('category', 'title')
        .sort({ createdAt: -1 })
    } else{
        tools = await Tool.find()
        .populate('category', 'title')
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    }

    if (!tools) {
        res.status(401);
        throw new Error("No tools found");
    }
    const pages = Math.ceil(total / pageSize);

    return res.status(200).json({tools, pages});
 } catch (error) {
        console.log(error)
        res.status(401);
        throw new Error("Error");
 }
});


const getToolByCategory = asyncHandler(async (req, res) => {
    let category = req.params.category;
    category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    let tools;
    if (category) {
        tools = await Tool.find()
            .populate({
                path: 'category',
                match: { title: { $regex: new RegExp(category, "i") } },
            })
            .exec();
        // Filter out the tools that did not match the category
        tools = tools.filter(tool => tool.category);
    } else {
        res.status(401);
        throw new Error("No data for this category");
    }
    
    res.json(tools);
  })

// @desc   update plan
// @route  PUT /api/plans
// @access  Public
const putTool = asyncHandler(async (req, res) => {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
        const updateTool = await Tool.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updateTool);
    
});

// @desc   DELETE plan
// @route  DELETE /api/PLAN/:id
// @access  Public
const deleteTool = asyncHandler(async (req, res) => {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
        res.status(401);
        throw new Error("No tool with this ID");
    }
    await tool.remove();
    res.status(201).json({ message: "the tool is deleted successfully" });
   
});

module.exports = {
    getTools,
    getToolByCategory,
    postTool,
    putTool,
    deleteTool,
}