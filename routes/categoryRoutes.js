const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/adminAuth");

const {
    getCategories,
    postCategory,
    putCategory,
    deleteCategory,
} = require("../controllers/categoryController");

router.route("/").post(protect, checkAdmin, postCategory).get(getCategories);
router.route("/:id").put(protect, checkAdmin, putCategory).delete(protect, checkAdmin, deleteCategory);


module.exports = router;