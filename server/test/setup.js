const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
  const connect = await mongoose.connect(process.env.DATA_BASE_TEST, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(console.log(`dataBase is connected : ${connect.connection.host}`.green.underline.bold));
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
