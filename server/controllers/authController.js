//------------------import----------------
const BadRequestError = require('../utils/errors/BadRequestError');
const asyncHandler = require('../utils/asyncHandler');
//import models
const User = require('../model/User');
//------------------end-------------------

// @desc    Register new user
// @route   POST auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) return next(new BadRequestError('An User already exist with this email'));

  const newUser = await User.create(req.body);
  sendTokenResponse(newUser, 200, res);
});

// @desc    Login user
// @route   POST auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new BadRequestError('Please provide an email and password'));

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new BadRequestError('Email Or Password is Wrong'));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new BadRequestError('Email Or Password is Wrong'));
  sendTokenResponse(user, 200, res);
});

// @desc    Get user information
// @route   Get auth/userInfo
// @access  Private
exports.getUserInfo = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.generateJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
