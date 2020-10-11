// -----------------imports-----------------
const asyncHandler = require('../utils/asyncHandler');
const Project = require('../model/Project');
// -----------------end---------------------

// @desc    Get single project
// @route   Get /projects/:id
// @access  Private
exports.getProject = asyncHandler(async (req, res, next) => {
  // get id & find project
  const { id } = req.params;
  const project = await Project.findById(id);
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
  // getting data
  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project,
  });
});
