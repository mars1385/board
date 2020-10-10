// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end--------------------

const dbConnection = async () => {
  const connect = await mongoose.connect(process.env.DATA_BASE_URL, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`dataBase is connected : ${connect.connection.host}`.green.underline.bold);
};

const dbDisconnect = async () => {
  await mongoose.disconnect();
};
module.exports = {
  dbConnection,
  dbDisconnect,
};
