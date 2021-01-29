//------------------import----------------
const ErrorResponse = require('../middlewares/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
//import models
const User = require('../model/User');
//------------------end-------------------

// @desc    Register new user
// @route   POST api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  // register new user
  const newUser = await User.create(req.body);
  // success
  sendTokenResponse(newUser, 200, res);
}); // end

// @desc    Login user
// @route   POST api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // our required field
  const { email, password } = req.body;
  // some validation
  if (!email || !password) return next(new ErrorResponse('Please provide an email and password', 400));
  // find user
  const user = await User.findOne({ email }).select('+password');
  // exist?
  if (!user) return next(new ErrorResponse('Email Or Password is Wrong', 401));
  // compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorResponse('Email Or Password is Wrong', 401));
  // success
  sendTokenResponse(user, 200, res);
}); // end

// method fo creating & sending token
const sendTokenResponse = (user, statusCode, res) => {
  // get token
  const token = user.generateJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
}; // end
