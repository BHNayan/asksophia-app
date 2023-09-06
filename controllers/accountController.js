const asyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");
const User = require("../models/userModel");
const { sendEmailToAddedAccount, inviteToAccountEmail } = require("./emailController");
const mongoose = require("mongoose");
const { generateToken } = require("./userController");

// @desc   Post a user to an account
// @route  POST /api/account/:accountId/user
// @access  Public
const postUserToAccount = asyncHandler(async (req, res) => {
  console.log("add new member")
  const { accountId } = req.params;
  const { emailToAdd } = req.body;
  
  const account = await Account.findById(accountId);
 
  if (!account) {
    res.status(401);
    throw new Error("Account not found");
  }
  if (account._id === req.user._id) {
    res.status(401);
    throw new Error("You cannot add yourself to your own account");
  }
  const user = await User.findOne({ email: emailToAdd });
 
  if (!user) {
    if (account.pending.includes(emailToAdd)) {
      res.status(400);
      throw new Error(`An invite was already sent to ${emailToAdd}`);
    }
    account.pending.push(emailToAdd);
    await account.save();
    inviteToAccountEmail(emailToAdd, req.user.username)
    return res.status(201).json(`An invite was sent to ${emailToAdd}.`);
  }

  if (account.members.length >= 6) {
    res.status(401);
    throw new Error("Account is already full");
  }

  if (account.members.includes(user._id)) {
    res.status(401);
    throw new Error(`${user.username} is already a member of this account`);
  }

  if (req.user.plan === "premium" && user) {
    account.members.push(user._id);
    await account.save();
    sendEmailToAddedAccount(emailToAdd, req.user.username);
  } else {
    inviteToAccountEmail(emailToAdd, req.user.username)
    res.status(401);
    throw new Error(`${emailToAdd} still didn't create an account. An Email was sent to the user.`);
  }

  return res.status(201).json(account);
});

// @desc   Get account data
// @route  GET /api/account/:accountId
// @access  Public
const getAccountData = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  const { userId } = req.body; // This would actually come from the decoded auth token

  const account = await Account.findById(accountId);

  if (!account) {
    return res.status(404).send("Account not found");
  }

  // Check if user is allowed to access the account
  if (
    !account.members.includes(userId) &&
    account.owner.toString() !== userId
  ) {
    res.status(403);
    throw new Error("You are not authorized to access this account");
  }

  // Do not send sensitive information like the members list
  const { members, ...accountData } = account.toObject();

  return res.status(200).json(accountData);
});

// @desc   Get account data
// @route  GET /api/:userId/accounts
// @access  Public
const getUserAccounts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  
  // Populate the 'account' field
  await user.populate({
    path: "account",
    populate: { path: "members" },
  });

  // Return the user's account
  return res.json({ accounts: user.account });
});

// @route  PUT /api/users/:userId/current-account
// @access  Private
const switchAccount = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { accountId, connectedId } = req.body;

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  // Check if the user is a member of the account
  const account = await Account.findById(accountId);
  if (!account || !account.members.includes(userId)) {
    return res.status(403).send("User is not a member of this account");
  }

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    googleId: user.googleId,
    credits: user.credits,
    numberofPosts: user.numberofPosts,
    role: user.role,
    account: user.account,
    createdAt: user.createdAt,
    userAccessingAccount: connectedId,
    token: generateToken(user._id),
  });
});
// @route  get /api/users/:userId/original-account
// @access  Private
const switchBack = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    googleId: user.googleId,
    credits: user.credits,
    numberofPosts: user.numberofPosts,
    role: user.role,
    account: user.account,
    createdAt: user.createdAt,
    token: generateToken(user._id),
  });
});

// @desc   Remove a member from an account
// @route  DELETE /api/account/:accountId/member/:memberId
// @access  Private
const removeMemberFromAccount = asyncHandler(async (req, res) => {
  console.log("remove member from account")
  const { accountId, memberId } = req.params;

  const account = await Account.findById(accountId);

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }
  // Only the account owner can remove a member from the account
  if (account.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error(
      "You are not authorized to remove members from this account"
    );
  }

  // Check if the user is a member of the account
  const memberIndex = account.members.findIndex(
    (member) => member.toString() === memberId
  );

  if (memberIndex === -1) {
    res.status(404);
    throw new Error("Member not found in this account");
  }

  if (req.user.plan === "premium") {
    // Remove the member from the account
    account.members.splice(memberIndex, 1);
    // Save the updated account
    await account.save();
  } else {
    res.status(403);
    throw new Error(
      "You are not authorized to remove members from this account"
    );
  }
  return res.status(200).json({memberId, message:"member deleted successfully"});
});

// @route  GET /api/user/:userId/member
// @access Public
const getUserBelongsToAccounts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const objectId = mongoose.Types.ObjectId(userId);
 
  const accounts = await Account.find({
    members: { $in: [objectId] },
    owner: { $ne: objectId },
  }).populate("owner", "email");
 
  if (!accounts || accounts.length === 0) {
    return res.status(404).send("No accounts found for this user");
  }

  return res.status(200).json(accounts);
});

module.exports = {
  postUserToAccount,
  switchBack,
  getUserAccounts,
  switchAccount,
  getAccountData,
  getUserBelongsToAccounts,
  removeMemberFromAccount,
};
