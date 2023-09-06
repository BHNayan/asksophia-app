const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createFolder,
    updateFolder,
    deleteFolder,
    removeToolFromFolder,
    assignToolToFolder,
    getUserFolders,
    getToolsByFolder,
    getProjectsByFolderId
} = require("../controllers/foldersController");

router.route("/").post(protect, createFolder);
router.route("/projects/:folderId").get(protect, getProjectsByFolderId);
router.route("/assign/:folderId/:toolId").put(protect, assignToolToFolder);
router.route("/:folderId/tools").get(protect, getToolsByFolder);
router.route("/user/:userId").get(protect, getUserFolders);
router.route("/:folderId").delete(protect, deleteFolder).put(protect, updateFolder);
router.route("/delete/:folderId/:itemId").delete(protect, removeToolFromFolder);



module.exports = router;