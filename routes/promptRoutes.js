const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getPrompts,
    getUserPrompts,
    putPrompt,
    getUserSavedPrompts,
    getPromptsByTopic,
    postPrompt,
    totalPrompts,
    getOnePrompt,
    deletePrompt,
} = require("../controllers/promptController");

router.route("/").post(protect, postPrompt);
router.route("/total").get(protect, totalPrompts);
router.route("/edit/:id").put(protect, putPrompt);
router.route("/:topics?").get(getPrompts);
router.route("/user/:id").get(protect, getUserPrompts);
router.route("/:topic").get(getPromptsByTopic);
router.route("/:id").delete(protect, deletePrompt).get(getOnePrompt);
router.route("/prompt/:id").get(getOnePrompt);
router.route("/:id/savedprompts").get(getUserSavedPrompts);
module.exports = router;