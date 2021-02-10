// -----------------imports-----------------
require('colors');
const express = require('express');
const morgan = require('morgan');
const errorsHandler = require('./middlewares/errorsHandler');
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
app.use('/projects/:id/tasks', require('./routers/projectTasksRouter'));

// error
app.use(errorsHandler);

// export server

module.exports = app;
