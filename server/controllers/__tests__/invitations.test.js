// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const Project = require('../../model/Project');
const factory = require('../../test/factory/Factory');
const { signIn } = require('../../test/helper');
const Task = require('../../model/Task');
const User = require('../../model/User');
const jwt = require('jsonwebtoken');
// -----------------end--------------------

const request = supertest(app);

describe('Invite user work flow', () => {
  it('A project can invite user', async () => {
    const project = await Project.create(factory.build('projectFactory'));

    const loginToken = await signIn(request);

    const user = await jwt.verify(loginToken, process.env.JWT_SECRET);

    await project.invite(user);
    console.log(await User.find());
    const task = await request
      .post(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'test task' })
      .expect(201);

    // expect(tasksResponse.body.data.toString()).toContain(task.toString());
  });
});
