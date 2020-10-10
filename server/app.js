// -----------------imports-----------------
require('colors');
const express = require('express');
const morgan = require('morgan');
const { dbConnection } = require('./config/db');
// -----------------end---------------------
//env
if (process.env.NODE_ENV !== 'development') require('dotenv/config');

const app = express();

// connect to dataBase
dbConnection();
// middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// sending to routers
app.use('/projects', require('./routers/projectsRouter'));

// export server

module.exports = app;
