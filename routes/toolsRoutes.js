const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/adminAuth");

const {
    getTools,
    getToolByCategory,
    postTool,
    putTool,
    deleteTool,
} = require("../controllers/toolsController");

router.route("/").post(protect, checkAdmin, postTool).get(getTools);
router.route("/category/:category").get(getToolByCategory);
router.route("/:id").put(protect, checkAdmin, putTool).delete(protect, checkAdmin, deleteTool);


module.exports = router;