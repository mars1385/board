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

describe('user working with project', () => {
  beforeAll(async () => {
    await dbConnection(process.env.DATA_BASE_TEST);
  });
  afterAll(async () => {
    await Project.deleteMany();
    await User.deleteMany();
    await dbDisconnect();
  });

  it('guest user can not create project', async () => {
    const project = factorys.build('projectFactory', { owner: null });
    let response = await request.post('/projects').send(project);

    expect(response.body.error).toContainEqual({
      field: 'auth',
      message: 'Not authorized to access this route',
    });
  });

  it('guest user can not get projects', async () => {
    let response = await request.get('/projects');

    expect(response.body.error).toContainEqual({
      field: 'auth',
      message: 'Not authorized to access this route',
    });
  });

  it('guest user can not get single project', async () => {
    const project = factorys.build('projectFactory');
    let response = await request.get(`/projects/${project.id}`);

    expect(response.body.error).toContainEqual({
      field: 'auth',
      message: 'Not authorized to access this route',
    });
  });

  it('user can create a project', async () => {
    const loginToken = await signIn(request, factorys);
    const data = factorys.build('projectFactory');

    let response = await request.post('/projects').set('authorization', `Bearer ${loginToken}`).send(data);
    expect(response.status).toBe(201);
    expect(response.body.data.title).toEqual(data.title);
    expect(response.body.data.description).toEqual(data.description);
    // see in dataBase
    const project = await Project.findById(response.body.data._id);
    expect(project.title).toEqual(data.title);
    expect(project.description).toEqual(data.description);
  });

  it('a user can get their project', async () => {
    const loginToken = await signIn(request, factorys);

    const user = jwt.verify(loginToken, process.env.JWT_SECRET);
    const data = factorys.build('projectFactory', { owner: user.id });

    // create
    const project = await Project.create(data);

    // get
    let response = await request.get(`/projects/${project._id}`).set('authorization', `Bearer ${loginToken}`);
    expect(response.status).toBe(200);
    expect(response.body.data.title).toEqual(project.title);
    expect(response.body.data.description).toEqual(project.description);
  });

  it('a auth user can not get others project', async () => {
    const loginToken = await signIn(request, factorys);
    const data = factorys.build('projectFactory');
    // create
    const project = await Project.create(data);
    // get

    let response = await request.get(`/projects/${project._id}`).set('authorization', `Bearer ${loginToken}`);
    expect(response.status).toBe(403);
    expect(response.body.error).toContainEqual({
      field: 'auth',
      message: 'User is not owner',
    });
  });

  it('project require a title', async () => {
    const loginToken = await signIn(request, factorys);
    const project = factorys.build('projectFactory', { title: null });
    let response = await request.post('/projects').set('authorization', `Bearer ${loginToken}`).send(project);
    expect(response.status).toBe(400);
    expect(response.body.error).toContainEqual({
      field: 'title',
      message: 'Please add a title',
    });
  });

  it('project require a description', async () => {
    const loginToken = await signIn(request, factorys);
    const project = factorys.build('projectFactory', { description: null });
    let response = await request.post('/projects').set('authorization', `Bearer ${loginToken}`).send(project);
    expect(response.status).toBe(400);
    expect(response.body.error).toContainEqual({
      field: 'description',
      message: 'Please add a description',
    });
  });
});
