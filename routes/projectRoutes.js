const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getProjects,
    getOneProject,
    postProject,
    putProject,
    totalProjects,
    getUserProjects,
    deleteProject,
} = require("../controllers/projectController");

router.route("/").post(protect, postProject).get(protect, getProjects);
router.route("/edit/:id").put(protect, putProject);
router.route("/user/:id").get(protect, getUserProjects);
router.route("/total").get(protect, totalProjects);
router.route("/:id").delete(protect, deleteProject).get(protect, getOneProject);
module.exports = router;