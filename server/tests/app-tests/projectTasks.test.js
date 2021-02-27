// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const { dbDisconnect, dbConnection } = require('../../config/db');
const Project = require('../../model/Project');

const Task = require('../../model/Task');
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
    await Task.deleteMany();
    await User.deleteMany();
    await dbDisconnect();
  });

  it('guest can not add task to project', async () => {
    const newProject = await Project.create(factorys.build('projectFactory'));

    const taskResponse = await request.post(`/projects/${newProject.id}/tasks`).send({ body: 'test task' });

    expect(taskResponse.status).toBe(401);
    expect(taskResponse.body.error).toContainEqual({
      field: 'auth',
      message: 'Not authorized to access this route',
    });
  });

  it('only owner of project cant add task', async () => {
    const loginToken = await signIn(request, factorys);

    const project = await Project.create(factorys.build('projectFactory'));

    const taskResponse = await request
      .post(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'test task' });

    expect(taskResponse.status).toBe(403);
    expect(taskResponse.body.error).toContainEqual({
      field: 'authorized',
      message: 'Not authorized to access this route',
    });
  });

  it('a project can have tasks', async () => {
    const loginToken = await signIn(request, factorys);

    const user = jwt.verify(loginToken, process.env.JWT_SECRET);

    const project = await Project.create(factorys.build('projectFactory', { owner: user.id }));

    const task = await request
      .post(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'test task' });

    const tasksResponse = await request
      .get(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`);

    expect(tasksResponse.status).toBe(200);
    expect(tasksResponse.body.data.toString()).toContain(task.toString());
  });

  // it('a project task can be updated', async () => {
  //   const loginToken = await signIn(request, factorys);

  //   const user = jwt.verify(loginToken, process.env.JWT_SECRET);

  //   const project = await Project.create(factorys.build('projectFactory', { owner: user.id }));

  //   const addTaskResponse = await request
  //     .post(`/projects/${project.id}/tasks`)
  //     .set('authorization', `Bearer ${loginToken}`)
  //     .send({ body: 'test task' });

  //   const updateTaskResponse = await request
  //     .patch(`/projects/${project.id}/tasks/${addTaskResponse.body.data.id}`)
  //     .set('authorization', `Bearer ${loginToken}`)
  //     .send({ body: 'test task', completed: true });

  //   const task = await Task.findById(updateTaskResponse.body.data.id);

  //   expect(updateTaskResponse.status).toBe(200);
  //   expect(task).toContainEqual(updateTaskResponse.body.data);
  // });

  it('a task require body', async () => {
    const loginToken = await signIn(request, factorys);

    const user = jwt.verify(loginToken, process.env.JWT_SECRET);
    const project = await Project.create(factorys.build('projectFactory', { owner: user.id }));

    const task = factorys.build('taskFactory', { body: null, project: project.id });

    const taskResponse = await request
      .post(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .send(task);

    expect(taskResponse.status).toBe(400);
    expect(taskResponse.body.error).toContainEqual({
      field: 'body',
      message: 'Please add a body',
    });
  });
});
