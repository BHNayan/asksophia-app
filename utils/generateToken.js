const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
NODE_ENV="development"

const generateToken = (res, userId) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

module.exports = {
    generateToken
}
