//------------------import----------------
const ErrorMessage = require('../utils/ErrorMessage');
const asyncHandler = require('../utils/asyncHandler');
//import models
const User = require('../model/User');
//------------------end-------------------

// @desc    Register new user
// @route   POST auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  sendTokenResponse(newUser, 200, res);
});

// @desc    Login user
// @route   POST auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new ErrorMessage('Please provide an email and password', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new ErrorMessage('Email Or Password is Wrong', 401));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorMessage('Email Or Password is Wrong', 401));

  sendTokenResponse(user, 200, res);
});

// @desc    Get user information
// @route   Get auth/userInfo
// @access  Private
exports.getUserInfo = asyncHandler(async (req, res, next) => {
  res.status(200).json({
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
