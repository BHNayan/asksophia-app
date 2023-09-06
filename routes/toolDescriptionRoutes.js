const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/adminAuth");

const {
    getTools,
    postTool,
    putTool,
    deleteTool,
} = require("../controllers/toolDescriptionController");

router.route("/").post(protect, checkAdmin, postTool).get(getTools);
router.route("/:id").put(protect, checkAdmin, putTool).delete(protect, checkAdmin, deleteTool);


module.exports = router;