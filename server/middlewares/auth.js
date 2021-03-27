// --------------------import--------------------
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/errors/AuthorizationError');
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
  if (!token) return next(new AuthorizationError());
  try {
    // decode
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) return next(new AuthorizationError());

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(new AuthorizationError());
  }
}); // end
