// -----------------imports-----------------
const app = require('./app');
const { dbConnection } = require('./config/db');

// -----------------end---------------------

// connect to dataBase
dbConnection(process.env.DATA_BASE_URL);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server is running in ${process.env.NODE_ENV} mode and on prot : ${PORT}`.blue.underline.bold);
});

process.on('unhandledRejection', (error, promise) => {
  console.log(`Error : ${error.message}`.red);
  server.close(() => process.exit(1));
}); //end
