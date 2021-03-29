// -----------------imports-----------------
require('colors');
const express = require('express');
const morgan = require('morgan');
const errorsHandler = require('./middlewares/errorsHandler');
const NotFoundError = require('./utils/errors/NotFoundError');
// -----------------end---------------------
//env
if (process.env.NODE_ENV !== 'development') require('dotenv/config');

const app = express();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// sending to routers
app.use('/projects', require('./routers/projectsRouter'));
app.use('/auth', require('./routers/authRouter'));
app.use('/projects/tasks', require('./routers/projectTasksRouter'));
app.use('/invitation', require('./routers/invitationRoute'));

app.all('*', async (req, res, next) => {
  return next(new NotFoundError('Sorry Route Not Found!'));
});

// error
app.use(errorsHandler);

// export server

module.exports = app;
