const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getTones,
    getOneTone,
    postTone,
    putTone,
    deleteTone,
} = require("../controllers/toneController");

const { checkAdmin } = require("../middleware/adminAuth");

router.route("/").post(protect, checkAdmin, postTone).get(getTones);
router.route("/:id").get(getOneTone).put(protect, checkAdmin, putTone).delete(protect, checkAdmin, deleteTone);


module.exports = router;