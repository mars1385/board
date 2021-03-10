const mongoose = require('mongoose');
const app = require('../app');
const Project = require('../model/Project');
const Task = require('../model/Task');
const factory = require('./factory/Factory');
const jwt = require('jsonwebtoken');

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
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

  await mongoose.connection.close();
});

// project
global.Project = class {
  loginToken;
  task;

  constructor({ loginToken = null, task = 0 }) {
    this.tasks = task;
    this.loginToken = loginToken;
  }

  create = async () => {
    let projectInput;

    if (this.loginToken) {
      const user = jwt.verify(this.loginToken, process.env.JWT_SECRET);
      projectInput = factory.build('projectFactory', { owner: user.id });
    } else {
      projectInput = factory.build('projectFactory');
    }
    const project = await Project.create(projectInput);

    let task = null;
    if (this.task !== 0) {
      task = await Task.create(factory.build('taskFactory', { project: project._id }));
    }

    return {
      project,
      task,
    };
  };
};
