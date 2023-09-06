const asyncHandler = require("express-async-handler");
const Tags = require("../models/tagsModel");

// @desc   Post a tag
// @route  POST /api/tags
// @access  Public
const postTag = asyncHandler(async (req, res) => {
    const { title, tag_type } = req.body;
    try {
        if (!title || !tag_type) {
            res.status(401);
            throw new Error("All fields must be filled");
        }
        const newTag = await Tags.create(req.body);
        res.status(200).json(newTag);
    } catch (error) {
        console.log(error)   
    }
});

// @desc   Get all tags
// @route  GET /api/tools
// @access  Public
const getTags = asyncHandler(async (req, res) => {
 try {
    const page = Number(req.query.page);
    const tag_type = req.query.tag_type;
    const pageSize = Number(req.query.pageSize) || 10;
    let tags = null;
    const query = tag_type ? { tag_type: tag_type } : {};

    const total = await Tags.countDocuments(query);
    if(!page){
        tags = await Tags.find(query)
    } else{
        tags = await Tags.find(query)
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    }
    if (!tags) {
        res.status(401);
        throw new Error("No tags found");
    }
    const pages = Math.ceil(total / pageSize);

    return res.status(200).json({tags, pages});
 } catch (error) {
        console.log(error)
        res.status(401);
        throw new Error("Error");
 }
});



// @desc   update tag
// @route  PUT /api/tags/:id
// @access  Public
const putTag = asyncHandler(async (req, res) => {
    const tag = await Tags.findById(req.params.id);
    if (!tag) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
        const updateTool = await Tags.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updateTool);
    
});

// @desc   DELETE tag
// @route  DELETE /api/tags/:id
// @access  Public
const deleteTag = asyncHandler(async (req, res) => {
    const tag = await Tags.findById(req.params.id);
    if (!tag) {
        res.status(401);
        throw new Error("No tag with this ID");
    }
    await tag.remove();
    res.status(201).json({ message: "the tag is deleted successfully" });
   
});

module.exports = {
    getTags,
    postTag,
    putTag,
    deleteTag
}