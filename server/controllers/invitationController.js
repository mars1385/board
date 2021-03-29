// -----------------imports-----------------
const asyncHandler = require('../utils/asyncHandler');
const Project = require('../model/Project');
require('../model/Activity');
const NotFoundError = require('../utils/errors/NotFoundError');
const AuthorizationError = require('../utils/errors/AuthorizationError');
const User = require('../model/User');
// -----------------end---------------------

// @desc    Invite a user to project
// @route   POST /projects/:projectId/invitation
// @access  Private
exports.inviteUser = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) return next(new NotFoundError('Project Not Found'));

  if (req.user.id !== project.owner.toString()) return next(new AuthorizationError());

  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new NotFoundError('User With This Email Not Found'));

  await project.invite(user._id);

  res.status(200).json({
    success: true,
  });
});
