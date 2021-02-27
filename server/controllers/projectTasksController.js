// -----------------imports-----------------
const Task = require('../model/Task');
const Project = require('../model/Project');
const asyncHandler = require('../utils/asyncHandler');
const ErrorMessage = require('../utils/ErrorMessage');
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

  if (!tasks) return next(new ErrorMessage(`Tasks not found`, 404, ['task']));

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

  const task = await Task.findOne({ _id: req.params.taskId, project: project._id });

  if (!task) return next(new ErrorMessage(`Task not found`, 404, ['task']));
});

const authProjectTask = async (projectId, user, next) => {
  if (!projectId) {
    return next(new ErrorMessage('Path dose not exist', 404, ['path']));
  }

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorMessage('Project dose not exits', 404, ['project']));
  }

  if (project.owner.toString() !== user.id) {
    return next(new ErrorMessage('Not authorized to access this route', 403, ['authorized']));
  }

  return project;
};
