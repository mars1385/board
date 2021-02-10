// -----------------imports-----------------
const asyncHandler = require('../utils/asyncHandler');
const Project = require('../model/Project');
const ErrorMessage = require('../utils/ErrorMessage');
// -----------------end---------------------

// @desc    Get all project
// @route   Get /projects
// @access  Private
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find();

  res.status(200).json({
    success: true,
    data: projects,
  });
});

// @desc    Get single project
// @route   Get /projects/:id
// @access  Private
exports.getProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (req.user.id !== project.owner.toString()) {
    return next(new ErrorMessage('User is not owner', 403));
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});
// @desc    Create new project
// @route   Post /projects
// @access  Private
exports.createProject = asyncHandler(async (req, res, next) => {
  req.body.owner = req.user.id;

  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project,
  });
});
