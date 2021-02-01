// --------------------import--------------------
const jwt = require('jsonwebtoken');
const ErrorMessage = require('../utils/ErrorMessage');
const asyncHandler = require('../utils/asyncHandler');
// models
const User = require('../model/User');
// --------------------end-----------------------

// protected route
exports.protectedRoute = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  let token;
  // validation
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }
  // check to see if token exist?
  if (!token) return next(new ErrorMessage('Not authorized to access this route', 401));
  try {
    // decode
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorMessage('Not authorized to access this route', 401));
  }
}); // end
