const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/adminAuth");
const { registerUser, getOneUser,totalUsers,
       getAllUsers, deleteUser, updateUserSubscription,
        checkUserAuth, putUser, login, logout } = require("../controllers/userController");
const { verifyEmail, ContactEmail } = require("../controllers/emailController");

const multer = require("multer");


const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });



router.post("/", registerUser);
router.post("/login", login);
router.get("/auth/refresh", protect, checkUserAuth);
router.get('/user/:id', protect, getOneUser);
router.put('/user/update', protect, upload.single("file"), putUser);
router.put('/user/update-subscription', protect, updateUserSubscription);
router.post('/contact', protect, ContactEmail);
router.get("/auth/logout", logout);

// admin routes
router.get('/', protect, checkAdmin, getAllUsers);
router.get('/total', protect, checkAdmin, totalUsers);
router.put('/user/admin/:id', protect, checkAdmin, putUser)
      .delete('/user/admin/:id', protect, checkAdmin, deleteUser);
router.get("/:id/verify/:token", verifyEmail);


module.exports = router;