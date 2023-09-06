const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getUserAccounts, postUserToAccount, switchBack,
        getUserBelongsToAccounts, switchAccount,
        getAccountData, removeMemberFromAccount } = require("../controllers/accountController");

router.put("/:userId/current-account", protect, switchAccount);
router.get("/:userId/original-account", protect, switchBack);
router.get("/:userId/accounts", protect, getUserAccounts);
router.route("/:accountId/user").post(protect, postUserToAccount);
router.route("/").get(protect, getAccountData);
router.route("/:userId/member").get(protect, getUserBelongsToAccounts);
router.delete("/:accountId/member/:memberId", protect, removeMemberFromAccount);


module.exports = router;