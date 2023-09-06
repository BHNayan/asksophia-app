// Import the required libraries and configurations
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv").config();
const User = require("../models/userModel");
const axios = require("axios");
const officegen = require("officegen");
const Chat = require("../models/chatModel");
const asyncHandler = require("express-async-handler");

// Initialize a new Configuration object with the API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
// Create a new OpenAIApi instance with the configuration object
const openai = new OpenAIApi(configuration);

// Define an asynchronous function to handle POST requests for generating a response
// based on the provided prompt
const postPrompt = async (req, res) => {
  const { prompt } = req.body;
  const el = { role: "user", content: prompt };
  let completion;
  // Attempt to generate a completion using OpenAI's GPT-3.5-Turbo model
  try {
    completion = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [el],
        max_tokens: 3048,
        temperature: 0.5,
        stream: true,
      },
      { responseType: "stream" }
    );

    req.io.emit("chatgptResChunk", { content: "." });
    const stream = completion.data;
    let chatgptResponse = { role: "assistant", content: "" };

    stream.on("data", (chunk) => {
      const payloads = chunk.toString().split("\n\n");
      for (const payload of payloads) {
        if (payload.includes("[DONE]")) return;
        if (payload.startsWith("data:")) {
          const data = JSON.parse(payload.replace("data: ", ""));
          try {
            const chunk = data.choices[0].delta?.content;
            if (chunk) {
              chatgptResponse.content += chunk;
              req.io.emit("chatgptResChunk", {
                content: chatgptResponse.content,
              });
            }
          } catch (err) {
            console.log(`Error with JSON.parse and ${payload}.\n${err}`);
            req.io.emit("resError", { error: err });
          }
        }
      }
    });

    stream.on("end", async () => {
      // save chatgpt response to db
      console.log("the end");
      // Extract the generated message content from the completion object
      let output = chatgptResponse.content;
      let wordCount = output.split(" ").length;
      await updateUserCharacter(req, "words", wordCount);
    });

    stream.on("error", (err) => {
      console.log(err);
      req.io.emit("resError", { error: err });
    });
  } catch (error) {
    // If there's an error, set the response status to 401 and log the error
    res.status(401);
    console.log(error);
    throw new Error("Unexpected Error");
  }
};
const postChatPrompt = async (req, res) => {
  const { chatData } = req.body;
  let completion;
  try {
    completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatData,
      max_tokens: 2048,
      temperature: 0.5,
      // stream: true,
    });

    res.status(200).json({ result: completion.data.choices[0].message });
  } catch (error) {
    // If there's an error, set the response status to 401 and log the error
    res.status(401);
    console.log(error);
    throw new Error("Unexpected Error");
  }
};
// @desc   Get all chats
// @route  GET /api/chats/:topic?
// @route  GET /api/chats
// @access  Public
const getChats = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const userId = req.params.userId;

  const user = await User.findById(userId);
  if (!user) {
    res.status(401);
    throw new Error("User doesnt'exist");
  }
  const query = {
    user: userId,
    isFolder: false
  };
  const total = await Chat.countDocuments({ user: userId });
  const chats = await Chat.find(query)
    .sort({ createdAt: -1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  if (!chats) {
    res.status(401);
    throw new Error("No chats found");
  }

  const pages = Math.ceil(total / pageSize);

  return res.status(200).json({ chats, pages });
});

// @desc   Post a History Chat
// @route  POST /api/chatHistory
// @access  Public
const saveChat = asyncHandler(async (req, res) => {
  const { chatData, conversId } = req.body;
  if (!chatData) {
    res.status(401);
    throw new Error("Please send a message.");
  }
  if (chatData.length > 0 && !conversId) {
    const newChat = await Chat.create({
      user: req.user._id,
      conversation: chatData,
      title: chatData[0].content,
    });
    res.status(200).json(newChat);
  } else if (chatData.length > 0 && conversId) {
    const chat = await Chat.findById(conversId);

    if (chat && chat.user.toString() === req.user._id.toString()) {
      chat.conversation = chatData;
      const updatedChat = await chat.save();
      res.status(200).json(updatedChat);
    } else {
      res.status(404);
      throw new Error("Chat not found");
    }
  }
});

// @desc   Get one chat
// @route  GET /api/chat-history/get/:id
// @access  Public
const getOneChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
 
  if (!chat) {
    res.status(401);
    throw new Error("No Chat found with this ID");
  }
  return res.status(201).json(chat);
});

const updateUserCharacter = async (req, type, outputLength) => {
  let user = await User.findOne({ _id: req.user._id });
  if (user.plan === "free") {
    type === "words"
      ? (user.words = user.words - outputLength)
      : (user.genratedImages = user.genratedImages - 1);
    await user.save();
  }
};

const generateImage = async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt)
  let completion;
  try {
    completion = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });
    // get the image URL
    const imageUrl = completion.data.data[0].url;

    // fetch the image data from the URL
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // encode the image data to base64
    const imageBase64 = Buffer.from(imageResponse.data, "binary").toString(
      "base64"
    );

    await updateUserCharacter(req, "image", 0);
    res
      .status(200)
      .json({
        result: completion.data.data[0].url,
        base: `data:image/png;base64,${imageBase64}`,
      });
  } catch (error) {
    res.status(401);
    console.log(error);
    throw new Error("Unexpected Error");
  }
};

const exportToWord = async (req, res) => {
  const { output } = req.body;

  const randomNumber = Math.floor(Math.random() * 100000);

  const docx = officegen({
    type: "docx",
    title: "Output",
    description: "Output",
    keywords: "output",
    creator: "Your Name",
    lastModifiedBy: "Your Name",
  });

  const pObj = docx.createP();
  pObj.addText(output);

  const fileName = `AskSophia_${randomNumber}.docx`;

  // Set the appropriate response headers for file download
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );

  // Send the Word document as a binary stream to the client
  docx.generate(res);
};

// @desc   delete chat
// @route  DELETE /api/chat
// @access  Public
const deleteChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
 
  if (!chat) {
    res.status(401);
    throw new Error("No chat with this ID");
  }

  if (req.user._id.toString() === chat.user.toString()) {
    // Remove the targeted image
    await chat.remove();
    res.status(201).json({ message: "the chat is deleted successfully" });
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

module.exports = {
  postPrompt,
  saveChat,
  postChatPrompt,
  deleteChat,
  getOneChat,
  getChats,
  exportToWord,
  generateImage,
};
