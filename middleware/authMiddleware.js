const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const protect = asyncHandler(async (req, res, next) => {
    // let token = req.body.token || req.query.token || req.headers['x-access-token'];
    let token = req.cookies.jwt;
    if (token) {
        try {
            // get token
            // token = req.headers.authorization.split(" ")[1];
            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // find user
            req.user = await User.findById(decoded.userId).select({ email: 0, password: 0 });
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized, no token");
    }
});

module.exports = { protect };