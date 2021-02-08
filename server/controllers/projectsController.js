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
  // check to see project exist?
  res.status(200).json({
    success: true,
    data: projects,
  });
});

// @desc    Get single project
// @route   Get /projects/:id
// @access  Private
exports.getProject = asyncHandler(async (req, res, next) => {
  // get id & find project
  const { id } = req.params;
  const project = await Project.findById(id);
  // check owner
  if (req.user.id !== project.owner.toString()) {
    return next(new ErrorMessage('User is not owner', 403));
  }
  // check to see project exist?
  res.status(200).json({
    success: true,
    data: project,
  });
});
// @desc    Create new project
// @route   Post /projects
// @access  Private
exports.createProject = asyncHandler(async (req, res, next) => {
  // add user id to collection
  req.body.owner = req.user.id;
  // getting data
  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project,
  });
});
