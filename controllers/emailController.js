const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const User = require("../models/userModel");
const Token = require("../models/tokenModel");

const dotenv = require("dotenv").config();

let transporter = nodemailer.createTransport({
    host: 'asksophia.io',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }

})

const updateSubscriptionEmail = (unpaidSubs) =>{
    unpaidSubs.forEach(sub => {
        transporter.sendMail({
          from: process.env.USER_EMAIL,
          to: sub.user.email,
          subject: 'Your subscription is pending',
          text: 'Please make a payment to continue your subscription.'
        }, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      });
}


const sendEmail = asyncHandler(async (email, url) => {
    console.log("end email")
    try {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Confirm your email",
            html: `
            <div>
                <img src="https://app.asksophia.io/images/whiteLogo.png" alt="AskSophia" style="width: 150px;"/>
                <p>You are receiving this email because you (or someone else) has requested to verify your email.</p>
                <p>Please click on the button below, or paste the following link into your browser to complete the process:</p>
                <a href="${url}" style="display: inline-block; background-color: #f44; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Email</a>
                <p>${url}</p>
                <p>If you did not request this, please ignore this email.</p>
            </div>`
        }
        transporter.sendMail(mailOptions);

    } catch (error) {
        throw new Error("Email is incorrect or doesn't exist")
    }
})

const ContactEmail = asyncHandler(async (req,res) => {
    console.log("contact email");
    const {firstname, lastname, subject, email, message} = req.body;
    try {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: subject,
            html: `
            <div>
                <img src="https://app.asksophia.io/images/whiteLogo.png" alt="AskSophia" style="width: 150px;"/>
                <p>Name: ${firstname} ${lastname}</p>
                <p>Email: ${email}</p>
                <p>${message}</p>
            </div>`
        }
        transporter.sendMail(mailOptions);
        res.status(200).send({message: 'Your email was sent successfully, we will reply as soon as possible'})

    } catch (error) {
        throw new Error("Email is incorrect or doesn't exist")
    }
})

const sendEmailToAddedAccount = asyncHandler(async (email, accountOwner) => {
    console.log("send email to added account")
    try {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Account Invitation",
            html: `
            <div>
                <img src="https://app.asksophia.io/images/whiteLogo.png" alt="AskSophia" style="width: 150px;"/>
                <p>You are receiving this email because you (or someone else) has requested it.</p>
                <p style="display: inline-block;">You were added by ${accountOwner} To use there account.</p>
                <p>Login and Go to members area to be able to switch accounts</p>
                <p>If you did not request this, please ignore this email.</p>
            </div>`
        }
        transporter.sendMail(mailOptions);

    } catch (error) {
        throw new Error("Email is incorrect or doesn't exist")
    }
})

const inviteToAccountEmail = asyncHandler(async (email, accountOwner) => {
    console.log("invite email to add an account")
    try {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Account Invitation",
            html: `
            <div>
                <img src="https://app.asksophia.io/images/whiteLogo.png" alt="AskSophia" style="width: 150px;"/>
                <p>You are receiving this email because you (or someone else) has requested it.</p>
                <p style="display: inline-block;">You were invited by ${accountOwner} To use their account.</p>
                <p>Please Signup using your email and go to members area to be able to switch accounts.</p>
                <a style="margin:"20px 0px" href="https://app.asksophia.io/sign-up" target="_blank">SignUp here</a>
                <p>If you did not request this, please ignore this email.</p>
            </div>`
        }
        transporter.sendMail(mailOptions);

    } catch (error) {
        throw new Error("Email is incorrect or doesn't exist")
    }
})


const verifyEmail = asyncHandler(async (req, res) => {
    console.log("verify-email")
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).send({ message: "Invalid link" });
        } else {
            user.verified = true;
            await user.save();
            await token.remove();
            return res.status(200).send({ message: "Email verified successfully" });
        }

    } catch (error) {
        res.status(500);
        throw new Error("Internal Server Error")
    }
})


module.exports = {
    sendEmail, verifyEmail, 
    sendEmailToAddedAccount, ContactEmail,
    inviteToAccountEmail, updateSubscriptionEmail
}