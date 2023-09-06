const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Folder = require("../models/folderModel");
const User = require("../models/userModel");

// @desc   Post a project
// @route  GET /api/projects
// @access  Public
const postProject = asyncHandler(async (req, res) => {
  const { title, response, url } = req.body;

  if (!title) {
    res.status(401);
    throw new Error("You dont have any text in the text field");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("No user found");
  }

  // Check if a project with the same URL already exists
  // const existingProject = await Project.findOne({ title });
  // if (existingProject) {
  //   res.status(400); // Bad Request
  //   throw new Error("A project with this title already exists");
  // }

  const newProject = await Project.create({
    user: req.user._id,
    title,
    response,
    url
  });
  res.status(200).json(newProject);
});

// @desc   Get all projects
// @route  GET /api/projects/:topic?
// @route  GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const total = await Project.countDocuments();
  const projects = await Project.find({})
    .sort({ createdAt: -1 })
    .populate("user")
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  if (!projects) {
    res.status(401);
    throw new Error("No projects found");
  }
  const pages = Math.ceil(total / pageSize);

  return res.status(200).json({ projects, pages });
});

// @desc   Get user projects
// @route  GET /api/projects/user/:id
// @access  Public
const getUserProjects = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 6;

  // Filter projects by user and isFolder=false
  const query = {
    user: req.params.id,
    isFolder: false
  };

  const total = await Project.countDocuments(query);

  if (req.user._id.toString() === req.params.id) {
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
      const pages = Math.ceil(total / pageSize);

    if (!projects || projects.length === 0) {
      return res.status(200).json({ projects:[], pages });
    }

    return res.status(200).json({ projects, pages });
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

// @desc   update project
// @route  PUT /api/projects/edit
// @access  Public
const putProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
      res.status(401);
      throw new Error("Project doesnt exist");
  }
  if ((req.user._id.toString() === project.user._id.toString()) || req.user.role==="admin") {
      const updatePrompt = await Project.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      console.log(updatePrompt)
      res.status(201).json({message:"Project updated"});
  } else {
      res.status(401);
      throw new Error("Unauthorized access");
  }
});



const totalProjects = asyncHandler(async (req, res) => {
  const count = await Project.countDocuments();
  res.json({total: count});
});

// @desc   Get user projects
// @route  GET /api/projects/project/:id
// @access  Public
const getOneProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(401);
    throw new Error("No Project found with this ID");
  }
  return res.status(201).json(project);
});

// @desc   Get project
// @route  GET /api/project
// @access  Public
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    res.status(401);
    throw new Error("No project with this ID");
  }

  if (req.user._id.toString() === project.user.toString()) {
    
    // Search for the project within all folders and remove it if found
    await Folder.updateMany(
      { tools: project._id }, 
      { $pull: { tools: project._id } }
    );
    
    await project.remove();

    res.status(201).json({ message: "The project is deleted successfully" });
    
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});


module.exports = {
  getProjects,
  getOneProject,
  postProject,
  totalProjects,
  getUserProjects,
  deleteProject,
  putProject,
};
