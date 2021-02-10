// ----------------import------------------
const ErrorMessage = require('../utils/ErrorMessage');
// ----------------end--------------------
// custom error handler
const errorsHandler = (err, req, res, next) => {
  // our errors
  let error = { ...err };
  error.message = err.message;
  // log error
  // mongoose id not correct ---> error
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorMessage(message, 404);
  }

  // mongoose duplicate value ---> error
  if (err.code === 11000) {
    let message = 'Duplicate field value entered';
    if (Object.keys(err.keyValue)[0] === 'email') {
      message = 'There is user with this email';
    }

    error = new ErrorMessage(message, 400);
  }

  // mongoose validation ---> error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorMessage(message, 400);
  }

  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

// export
module.exports = errorsHandler;
