// -----------------imports-----------------
const Task = require('../model/Task');
const asyncHandler = require('../utils/asyncHandler');
const ErrorMessage = require('../utils/ErrorMessage');
// -----------------end---------------------

// @desc    Add new Task
// @route   Post /projects/:id/tasks
// @access  Private
exports.addTasks = asyncHandler(async (req, res, next) => {
  req.body.owner = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});
