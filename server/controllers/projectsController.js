// -----------------imports-----------------
const asyncHandler = require('../utils/asyncHandler');
const Project = require('../model/Project');
// -----------------end---------------------

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
