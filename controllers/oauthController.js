const passport = require("passport");
const dotenv = require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const {generateToken} = require('../utils/generateToken.js');
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Account = require("../models/accountModel");

const client = new OAuth2Client(process.env.CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}


const signupGoogle = asyncHandler(async (req, res) => {
  try {
    // console.log({ verified: await verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const user = await User.create({
         username:profile.name,
         verified:true, email:profile.email, img_url:profile.picture,
         googleId: profile.sub, password:profile.sub });

         const account = await Account.create({ owner: user._id, members: [user._id] });
         user.account = account._id;
         await user.save();

         if (user) {
          const accountsWithUserPending = await Account.find({ pending: profile.email });
          for (let account of accountsWithUserPending) {
            const pendingIndex = account.pending.indexOf(profile.email);
            if (pendingIndex > -1) {
              account.pending.splice(pendingIndex, 1);
              account.members.push(user._id);
              await account.save();
            }
          }
      }

      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        verified:user.verified,
        googleId: user.googleId,
        img_url:user.img_url,
        credits: user.credits,
        account: user.account,
        numberofPosts: user.numberofPosts,
        role: user.role,
        createdAt: user.createdAt,
        isPaypalConnected:user.isPaypalConnected,
        paypalAccountEmail:user.paypalAccountEmail
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
})

const loginGoogle = asyncHandler(async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const user = await User.findOne({ email:profile?.email });

      if (!user) {
        res.status(400)
        throw new Error("You are not registered. Please sign up")
      }

      generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            googleId: user.googleId,
            credits: user.credits,
            img_url:user.img_url,
            numberofPosts: user.numberofPosts,
            role: user.role,
            account: user.account,
            createdAt: user.createdAt,
            plan:user.plan,
            isPaypalConnected:user.isPaypalConnected,
            paypalAccountEmail:user.paypalAccountEmail
        });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
})


module.exports = {
  signupGoogle, loginGoogle
};