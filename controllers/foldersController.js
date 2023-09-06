const Folder = require("../models/folderModel");
const Project = require("../models/projectModel");
const Prompt = require("../models/promptModel");
const Chat = require("../models/chatModel");
const asyncHandler = require("express-async-handler");

// Create a new folder
const createFolder = async (req, res) => {
  try {
    const folder = new Folder(req.body);
    const savedFolder = await folder.save();
    res.status(201).json(savedFolder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing folder
const updateFolder = async (req, res) => {
  try {
    const updatedFolder = await Folder.findByIdAndUpdate(
      req.params.folderId,
      req.body,
      { new: true }
    );
    if (!updatedFolder) {
      return res.status(404).json({ error: "Folder not found" });
    }
    res.status(200).json(updatedFolder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a folder
const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.folderId);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    // Update all projects within the folder, setting their isFolder field to false
    await Project.updateMany(
      { _id: { $in: folder.tools } },
      { $set: { isFolder: false } }
    );
    await Prompt.updateMany(
      { _id: { $in: folder.tools } },
      { $set: { isFolder: false } }
    );
    await Chat.updateMany(
      { _id: { $in: folder.tools } },
      { $set: { isFolder: false } }
    );

    // Remove the folder
    await folder.remove();

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeToolFromFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.folderId);
    if (!folder) {
      res.status(401);
      throw new Error("Folder Not found");
    }

    if (folder.folderType === "project") {
      const tool = await Project.findById(req.params.itemId);
      if (!tool) {
        return res.status(404).json({ error: "Project not found" });
      }

      const index = folder.tools.indexOf(req.params.itemId);
      if (index > -1) {
        folder.tools.splice(index, 1);
        tool.isFolder = false;
        await tool.save(); 
      } else {
        return res
          .status(404)
          .json({ error: "Project not found in the folder" });
      }
    } else if(folder.folderType === "prompt") {
      const tool = await Prompt.findById(req.params.itemId);
      if (!tool) {
        return res.status(404).json({ error: "Prompt not found" });
      }

      const index = folder.prompts.indexOf(req.params.itemId);
      if (index > -1) {
        folder.prompts.splice(index, 1);
        tool.isFolder = false;
        await tool.save();  
      } else {
        return res.status(404).json({ error: "Tool not found in the folder" });
      }
    } else if(folder.folderType === "chat") {
      const tool = await Chat.findById(req.params.itemId);
      if (!tool) {
        return res.status(404).json({ error: "Chat not found" });
      }

      const index = folder.chats.indexOf(req.params.itemId);
      if (index > -1) {
        folder.chats.splice(index, 1);
        tool.isFolder = false; 
        await tool.save(); 
      } else {
        return res.status(404).json({ error: "Tool not found in the folder" });
      }
    }
    await folder.save();
    res.status(200).json({ id: req.params.itemId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getProjectsByFolderId = async (req, res) => {
  try {
    let populateField = "";
    const folder = await Folder.findById(req.params.folderId);

    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    if (folder.folderType === "project") {
      populateField = "tools";
    } else if(folder.folderType === "prompt") {
      populateField = "prompts";
    } else if(folder.folderType === "chat"){
      populateField = "chats";
    }

    await folder.populate(populateField);
    const items = folder[populateField];
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Assign a tool to a folder (assuming the tool already exists)
const assignToolToFolder = asyncHandler(async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.folderId);
    if (!folder) {
      res.status(401);
      throw new Error("Folder not found");
    }

    const tool = await Project.findById(req.params.toolId);
    const prompt = await Prompt.findById(req.params.toolId);
    const chat = await Chat.findById(req.params.toolId);

    if (!tool && !prompt && !chat) {
      res.status(401);
      throw new Error("Tool not found");
    }

    // Add the tool ID to the folder's tools array
    if (tool) {
      // Check if the tool is already in the folder
      if (folder.tools.some(t => t._id.equals(tool._id))) {
        res.status(401);
        throw new Error("Project already added.");
      }
      folder.tools.push(tool._id);
      tool.isFolder = true;
      await tool.save();
    } else if(prompt) {
      // Check if the prompt is already in the folder
      if (folder.prompts.some(p => p._id.equals(prompt._id))) {
        res.status(401);
        throw new Error("Prompt already added.");
      }
      folder.prompts.push(prompt._id);
      prompt.isFolder = true;
      await prompt.save();
    } else if(chat) {
      // Check if the chat is already in the folder
      if (folder.prompts.some(p => p._id.equals(prompt._id))) {
        res.status(401);
        throw new Error("Chat already added.");
      }
      folder.chats.push(chat._id);
      chat.isFolder = true;
      await chat.save();
    }
    await folder.save();
    res.status(200).json("Folder and project are updated successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


const getUserFolders = async (req, res) => {
  const folderType = req.query.folderType;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 6;
  const total = await Folder.countDocuments({ user: req.params.id });
  try {
    const userId = req.params.userId;
    const folders = await Folder.find({ owner: userId, folderType })
      .populate("tools")
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const pages = Math.ceil(total / pageSize);
    return res.status(200).json({ folders, pages });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getToolsByFolder = async (req, res) => {
  try {
    const folderId = req.params.folderId;
    const folder_projects = await Folder.findById(folderId).populate("tools");
    const folder_prompts = await Folder.findById(folderId).populate("prompts");

    if (!folder_projects && !folder_prompts) {
      return res.status(404).json({ error: "Folder not found" });
    }
    res
      .status(200)
      .json(folder_projects ? folder_projects.tools : folder_prompts.prompts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createFolder,
  updateFolder,
  deleteFolder,
  removeToolFromFolder,
  assignToolToFolder,
  getUserFolders,
  getProjectsByFolderId,
  getToolsByFolder,
};
