// -----------------imports-----------------
require('colors');
const express = require('express');
const morgan = require('morgan');
const errorResponse = require('./middlewares/errorResponse');
const { dbConnection } = require('./config/db');
// -----------------end---------------------
//env
if (process.env.NODE_ENV !== 'development') require('dotenv/config');

const app = express();

dbConnection();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// sending to routers
app.use('/projects', require('./routers/projectsRouter'));

// error
app.use(errorResponse);

// export server

module.exports = app;
