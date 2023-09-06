const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/adminAuth");

const {
    getTags,
    postTag,
    putTag,
    deleteTag
} = require("../controllers/tagsController");

router.route("/").post(protect, checkAdmin, postTag).get(getTags);
router.route("/:id").put(protect, checkAdmin, putTag).delete(protect, checkAdmin, deleteTag);


module.exports = router;