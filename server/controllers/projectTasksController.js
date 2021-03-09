// -----------------imports-----------------
const Task = require('../model/Task');
const Project = require('../model/Project');
const asyncHandler = require('../utils/asyncHandler');
const NotFoundError = require('../utils/errors/NotFoundError');
const AuthorizationError = require('../utils/errors/AuthorizationError');
// -----------------end---------------------

// @desc    Add new Task to project
// @route   Post /projects/:projectId/tasks
// @access  Private
exports.addTasks = asyncHandler(async (req, res, next) => {
  const project = await authProjectTask(req.params.projectId, req.user, next);

  req.body.project = project._id;
  const task = await Task.create(req.body);
  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Get all Project tasks
// @route   Get /projects/:projectId/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  const project = await authProjectTask(req.params.projectId, req.user, next);

  const tasks = await Task.find({ project: project._id });

  if (!tasks) return next(new NotFoundError(`Tasks not found`));

  res.status(200).json({
    success: true,
    data: tasks,
  });
});

// @desc    Update Project task
// @route   Patch /projects/:projectId/tasks/:taskId
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  const project = await authProjectTask(req.params.projectId, req.user, next);

  const task = await Task.findById(req.params.taskId);

  if (!task) return next(new NotFoundError(`Task not found`));

  if (task.project.toString() !== project.id) {
    return next(new AuthorizationError());
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    task: updatedTask,
  });
});

const authProjectTask = async (projectId, user, next) => {
  if (!projectId) {
    return next(new NotFoundError('Path dose not exist'));
  }

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new NotFoundError('Project dose not exits'));
  }

  if (project.owner.toString() !== user.id) {
    return next(new AuthorizationError());
  }

  return project;
};
