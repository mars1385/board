// -----------------imports-----------------
const asyncHandler = require('../utils/asyncHandler');
const Project = require('../model/Project');
require('../model/Activity');
const NotFoundError = require('../utils/errors/NotFoundError');
const AuthorizationError = require('../utils/errors/AuthorizationError');
// -----------------end---------------------

// @desc    Get all project
// @route   Get /projects
// @access  Private
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({ owner: req.user.id }).sort('-updatedAt');

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

  if (!project) return next(new NotFoundError('Project dose not exist'));

  if (req.user.id !== project.owner.toString()) {
    return next(new AuthorizationError());
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

// @desc    update project
// @route   Patch /projects/:id
// @access  Private
exports.updateProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) return next(new NotFoundError('Project dose not exist'));

  if (req.user.id !== project.owner.toString()) {
    return next(new AuthorizationError());
  }

  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    project: updatedProject,
  });
});

// @desc    Remove project
// @route   DELETE /projects/:id
// @access  Private
exports.removeProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) return next(new NotFoundError('Project dose not exist'));

  await project.remove();

  res.status(200).json({
    success: true,
  });
});

const authProject = async (req) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) return next(new NotFoundError('Project dose not exist'));

  if (req.user.id !== project.owner.toString()) {
    return next(new AuthorizationError());
  }
};
