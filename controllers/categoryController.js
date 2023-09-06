const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// @desc   Post a category
// @route  POST /api/category
// @access  Public
const postCategory = asyncHandler(async (req, res) => {
    const { title, text } = req.body;
    if (!title || !text) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
    const newTool = await Category.create(req.body);
    res.status(200).json(newTool);
});

// @desc   Get all categories
// @route  GET /api/category
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    try {
        let categories =null;
       const page = Number(req.query.page);
       const pageSize = Number(req.query.pageSize) || 10;
   
       const total = await Category.countDocuments();
       if(!page){
        categories = await Category.find()
           .sort({ createdAt: -1 })
           
       } else {
       categories = await Category.find()
           .sort({ createdAt: -1 })
           .skip(pageSize * (page - 1))
           .limit(pageSize);
       }
       if (!categories) {
           res.status(401);
           throw new Error("No categories found");
       }
       const pages = Math.ceil(total / pageSize);
   
       return res.status(200).json({categories, pages});
    } catch (error) {
           console.log(error)
           res.status(401);
           throw new Error("Error");
    }
   });

// @desc   update category
// @route  PUT /api/category
// @access  Public
const putCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updateCategory);
    
});

// @desc   DELETE category
// @route  DELETE /api/category/:id
// @access  Public
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(401);
        throw new Error("No category with this ID");
    }
    await category.remove();
    res.status(201).json({ message: "the category is deleted successfully" });
   
});

module.exports = {
    getCategories,
    postCategory,
    putCategory,
    deleteCategory,
}