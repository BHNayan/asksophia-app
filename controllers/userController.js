const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../controllers/emailController");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
const Account = require("../models/accountModel");
const {generateToken} = require('../utils/generateToken.js');

const storage = require("../firebase");
const {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } = require("firebase/storage");
const { checkImage } = require("../utils/checkImage");

// @desc   register user
// @route  POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(401);
        throw new Error("Fields should not be empty");
    }
    // Checking if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(401);
        throw new Error("Email already exists");
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = await User.create({ username: username, email: email, password: hashedPassword });
    //create an account
    const account = await Account.create({ owner: newUser._id, members: [newUser._id] });


    newUser.account = account._id;
    await newUser.save();

    if (newUser) {
        const accountsWithUserPending = await Account.find({ pending: email });
        for (let account of accountsWithUserPending) {
          const pendingIndex = account.pending.indexOf(email);
          if (pendingIndex > -1) {
            account.pending.splice(pendingIndex, 1);
            account.members.push(newUser._id);
            await account.save();
          }
        }
    }
    
    if (!newUser.verified) {
        let token = await Token.findOne({ userId: newUser._id });
        if (!token) {
            token = await new Token({
                userId: newUser._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        const url = `${process.env.DOMAIN}/${newUser._id}/verify/${token.token}`;
        sendEmail(newUser.email, url);
        return res
            .status(200)
            .send({ message: "Your account has been created, An Email sent to your account please verify" });
    }
});




// @desc   login
// @route  POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Find user
    const user = await User.findOne({ email });
    // Check password
    if (user && (await bcrypt.compare(password, user.password))) {
        if(user.status!=="active"){
            res.status(400);
            throw new Error("Your account is desactivated Please contact the support");
        }
        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = await Token.create({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                });
            }

            const url = `${process.env.DOMAIN}/${user._id}/verify/${token.token}`;
            sendEmail(user.email, url);
            return res
                .status(400)
                .send({ message: "An Email sent to your account please verify" });
        }
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            img_url:user.img_url,
            email: user.email,
            googleId: user.googleId,
            credits: user.credits,
            numberofPosts: user.numberofPosts,
            role: user.role,
            account: user.account,
            createdAt: user.createdAt,
            plan:user.plan,
            isPaypalConnected:user.isPaypalConnected,
            paypalAccountEmail:user.paypalAccountEmail
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// @desc   Get one user
// @route  GET /api/users/user/:id
// @access  Public
const getOneUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(401);
        throw new Error("No User found with this ID");
    }
    return res.status(201).json(user);
});


const updateUserSubscription = asyncHandler(async(req, res)=>{
    const user = await User.findOne({ _id: req.user._id })

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    if ((req.user._id.toString() === user._id.toString())) {
        await User.findByIdAndUpdate(
            req.user._id,
            req.body,
            { new: true }
        );
        res.status(201).json("updated successfully");
    } else {
        res.status(401);
        throw new Error("Unauthorized access");
    }

})

const putUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })
    const userIdEdit = req.params.id;
    const file = req.file;
    
    let updateUser = null;
    if (!user) {
        res.status(401);
        throw new Error("User doesnt exist");
    }

    if (req.user._id) {
        if(userIdEdit && req.user.role === "admin"){
            updateUser = await User.findByIdAndUpdate(
                userIdEdit,
                req.body,
                { new: true }
            );
           
        } else {
          if(file){
            await checkImage(file, res);
            if (user.img_url && !user.img_url.includes('googleusercontent')) {
                // Extract the file name from the old image URL
                const oldImagePath = user.img_url; // Get the old image path from your database
                const oldImageRef = ref(storage, oldImagePath);
                // Delete the old image
                deleteObject(oldImageRef)
                .then(() => {
                    console.log("deleted")
                  })
                .catch((error) => {
                    console.error(`Failed to delete old image. ${error}`);
                });
            }
            const uniqueFileName = uuidv4();
            const fileExtension = file.originalname.split('.').pop();
            const newFileName = `${uniqueFileName}.${fileExtension}`;

            const imageRef = ref(storage, newFileName);
            const metatype = { contentType: file.mimetype, name: newFileName };
 
            await uploadBytes(imageRef, file.buffer, metatype)
            .then(async () => {
            const downloadURL = await getDownloadURL(imageRef); 
            req.body.img_url = downloadURL; 
            })
            .catch((error) => console.log(error.message));
            updateUser = await User.findByIdAndUpdate(
                req.user._id,
                req.body,
                { new: true }
            );
          }
        }
        res.status(201).json("Profile updated successfully");
    } else {
        res.status(401);
        throw new Error("Unauthorized access");
    }
})


// @desc   Get all users
// @route  GET /api/users
// @access  Public
const getAllUsers = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10; 

    const total = await User.countDocuments();
    const users = await User.find()
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    if (!users) {
        res.status(401);
        throw new Error("No users found");
    }
    const pages = Math.ceil(total / pageSize);

    return res.status(200).json({users, pages});
});

const totalUsers = asyncHandler(async (req, res) => {
    const count = await User.countDocuments();
    res.json({total: count});
});

const checkUserAuth = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            googleId: user.googleId,
            credits: user.credits,
            img_url:user.img_url,
            numberofPosts: user.numberofPosts,
            role: user.role,
            createdAt: user.createdAt,
            // Generate a new JWT for the user
            token: generateToken(user._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

const logout = (req, res) => {
    req.logout();
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "logged out" })
};


// @desc   delete user
// @route  GET /api/users/user/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(401);
        throw new Error("No User with this ID");
    }
    if (req.user.role === "admin") {
        // Remove the targeted image
        await user.remove();
        res.status(201).json({ message: "User is deleted successfully" });
    } else {
        res.status(401);
        throw new Error("Unauthorized access");
    }
});
module.exports = {
    registerUser, logout, putUser, totalUsers,
    login, checkUserAuth, getOneUser, getAllUsers,
    deleteUser, generateToken, updateUserSubscription
}