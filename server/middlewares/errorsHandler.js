// ----------------import------------------
const ErrorMessage = require('../utils/ErrorMessage');
// ----------------end--------------------
// custom error handler
const errorsHandler = (err, req, res, next) => {
  // our errors
  let error = { ...err };
  error.message = err.message;
  let errorsMessages;
  let field = ['server'];
  // log error
  // mongoose id not correct ---> error
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    field = ['Resource'];
    error = new ErrorMessage(message, 404, field);
  }

  // mongoose duplicate value ---> error
  if (err.code === 11000) {
    let message = 'Duplicate field value entered';
    field = ['Duplicate'];
    if (Object.keys(err.keyValue)[0] === 'email') {
      message = 'There is user with this email';
      field = ['email'];
    }

    error = new ErrorMessage(message, 400, field);
  }

  // mongoose validation ---> error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    const fields = Object.values(err.errors).map((val) => val.path);
    error = new ErrorMessage(message, 400, fields);
  }

  if (error.message) {
    const messages = error.message.split(',');
    errorsMessages = messages.map((message, index) => ({ field: error.field[index], message }));
  }

  res.status(error.status || 500).json({
    success: false,
    error: errorsMessages || error.message || 'Server Error',
  });
};

// export
module.exports = errorsHandler;
