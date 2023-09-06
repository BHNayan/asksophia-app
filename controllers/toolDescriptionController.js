const asyncHandler = require("express-async-handler");
const Tool_description = require("../models/toolDecsriptionModel");

// @desc   Post a tool
// @route  POST /api/tool
// @access  Public
const postTool = asyncHandler(async (req, res) => {
  const { name, link, fields } = req.body;
  console.log("post tool description")
  try {
    if (!name || !link || !fields || fields.length === 0) {
      res.status(401);
      throw new Error("All fields must be filled");
    }

    const newTool = await Tool_description.create({ name, link, fields });

    res.status(200).json(newTool);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
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

    const total = await Tool_description.countDocuments();
    if (!page) {
      tools = await Tool_description.find()
        .populate("name", "title")
        .sort({ createdAt: -1 });
    } else {
      tools = await Tool_description.find()
        .populate("name", "title")
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    }
    if (!tools) {
      res.status(401);
      throw new Error("No tools found");
    }
    const pages = Math.ceil(total / pageSize);

    return res.status(200).json({ tools, pages });
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Error");
  }
});


// @desc   update plan
// @route  PUT /api/plans
// @access  Public
const putTool = asyncHandler(async (req, res) => {
  const tool = await Tool_description.findById(req.params.id);
  if (!tool) {
    res.status(401);
    throw new Error("Tool Not Found");
  }
  const updateTool = await Tool_description.findByIdAndUpdate(
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
  const tool = await Tool_description.findById(req.params.id);
  if (!tool) {
    res.status(401);
    throw new Error("No tool with this ID");
  }
  await tool.remove();
  res.status(201).json({ message: "the tool is deleted successfully" });
});

module.exports = {
  getTools,
  postTool,
  putTool,
  deleteTool,
};
