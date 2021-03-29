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
  const ownedProjects = await Project.find({ owner: req.user.id }).sort('-updatedAt');

  const invitedProjects = await Project.find({ members: req.user.id });

  res.status(200).json({
    success: true,
    data: ownedProjects.concat(invitedProjects),
  });
});

// @desc    Get single project
// @route   Get /projects/:id
// @access  Private
exports.getProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let project = await Project.findById(id);

  const invitedProject = await Project.findOne({ _id: id, members: req.user.id });

  if (!project || invitedProject) {
    project = invitedProject;
  }

  if (!project) return next(new NotFoundError('Project dose not exist'));

  // console.log(req.user.id !== project.owner.toString() && !project.members.includes(req.user.id));

  if (req.user.id !== project.owner.toString() && !project.members.includes(req.user.id)) {
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
