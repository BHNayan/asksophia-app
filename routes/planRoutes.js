const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getPlans,
    getOnePlan,
    postPlan,
    putPlan,
    deletePlan,
} = require("../controllers/plansController");
const { checkAdmin } = require("../middleware/adminAuth");

router.route("/").post(protect, checkAdmin, postPlan).get(getPlans);
router.route("/:id").get(getOnePlan).put(protect, checkAdmin, putPlan).delete(protect, checkAdmin, deletePlan);


module.exports = router;