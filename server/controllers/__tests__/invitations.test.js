// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const Project = require('../../model/Project');
const factory = require('../../test/factory/Factory');
const { signIn } = require('../../test/helper');
const jwt = require('jsonwebtoken');
const Task = require('../../model/Task');
const User = require('../../model/User');
// -----------------end--------------------

const request = supertest(app);

describe('Invite user work flow', () => {
  it('Only owner project can invite a user', async () => {
    const loginToken = await signIn(request);

    const project = await Project.create(factory.build('projectFactory'));

    const inviteResponse = await request
      .post(`/projects/${project.id}/invitation`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ email: 'dasdwq@jckansc.com' })
      .expect(401);

    expect(inviteResponse.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
  });

  it('A project can invite a user', async () => {
    const loginToken = await signIn(request);

    const user = await jwt.verify(loginToken, process.env.JWT_SECRET);

    const invitedUser = await User.create(factory.build('userFactory'));
    let project = await Project.create(factory.build('projectFactory', { owner: user.id }));

    const inviteResponse = await request
      .post(`/projects/${project.id}/invitation`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ email: invitedUser.email })
      .expect(200);

    project = await Project.findById(project.id);
    expect(project.members).toContainEqual(invitedUser._id);
  });

  it('A project can invite a only register user', async () => {
    const loginToken = await signIn(request);

    const user = await jwt.verify(loginToken, process.env.JWT_SECRET);

    let project = await Project.create(factory.build('projectFactory', { owner: user.id }));

    const inviteResponse = await request
      .post(`/projects/${project.id}/invitation`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ email: 'dasdwq@jckansc.com' })
      .expect(404);

    expect(inviteResponse.body.errors).toContainEqual({
      message: 'User With This Email Not Found',
    });
  });

  it('A invited user can update project', async () => {
    const project = await Project.create(factory.build('projectFactory'));

    const loginToken = await signIn(request);

    const user = await jwt.verify(loginToken, process.env.JWT_SECRET);

    await project.invite(user.id);

    const tasksResponse = await request
      .post(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'test task' })
      .expect(201);

    const task = await Task.findById(tasksResponse.body.data._id);

    expect(tasksResponse.body.data.body).toEqual(task.body);
  });
});
