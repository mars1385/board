// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const { dbDisconnect, dbConnection } = require('../../config/db');
const Project = require('../../model/Project');
const User = require('../../model/User');
const factorys = require('../factory/Factorys');
const { signIn } = require('../helper');
const jwt = require('jsonwebtoken');
// -----------------end--------------------

const request = supertest(app);

describe('user working with project tasks', () => {
  beforeAll(async () => {
    await dbConnection(process.env.DATA_BASE_TEST);
  });
  afterAll(async () => {
    await Project.deleteMany();
    await User.deleteMany();
    await dbDisconnect();
  });

  it('a project can have tasks', async () => {
    const loginToken = await signIn(request, factorys);

    const user = jwt.verify(loginToken, process.env.JWT_SECRET);

    const { _id } = await Project.create(factorys.build('projectFactory', { owner: user.id }));
    await request
      .post(`/projects/${_id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ title: 'test task' });

    const project = await request.get(`/projects/${_id}`).set('authorization', `Bearer ${loginToken}`);

    expect(project.body.tasks).toContain('test task');
  });
});
