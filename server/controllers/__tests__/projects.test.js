// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const Project = require('../../model/Project');
const factory = require('../../test/factory/Factory');
const { signIn } = require('../../test/helper');
const jwt = require('jsonwebtoken');
// -----------------end--------------------

const request = supertest(app);

describe('user working with project', () => {
  it('guest user can not create project', async () => {
    const project = factory.build('projectFactory', { owner: null });
    let response = await request.post('/projects').send(project).expect(401);

    expect(response.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
  });

  it('guest user can not get projects', async () => {
    let response = await request.get('/projects').expect(401);

    expect(response.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
  });

  it('guest user can not get single project', async () => {
    const project = factory.build('projectFactory');
    let response = await request.get(`/projects/${project.id}`).expect(401);

    expect(response.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
  });

  it('user can create a project', async () => {
    const loginToken = await signIn(request);
    const data = factory.build('projectFactory');
    let response = await request
      .post('/projects')
      .set('authorization', `Bearer ${loginToken}`)
      .send(data)
      .expect(201);
    expect(response.body.data.title).toEqual(data.title);
    expect(response.body.data.description).toEqual(data.description);
    expect(response.body.data.generalNote).toEqual(data.generalNote);
    // see in dataBase
    const project = await Project.findById(response.body.data._id);

    expect(project.title).toEqual(data.title);
    expect(project.description).toEqual(data.description);
    expect(project.generalNote).toEqual(data.generalNote);
  });

  it('a user can get their project', async () => {
    const loginToken = await signIn(request);

    const user = jwt.verify(loginToken, process.env.JWT_SECRET);
    const data = factory.build('projectFactory', { owner: user.id });

    // create
    const project = await Project.create(data);

    // get
    let response = await request
      .get(`/projects/${project._id}`)
      .set('authorization', `Bearer ${loginToken}`)
      .expect(200);

    expect(response.body.data.title).toEqual(project.title);
    expect(response.body.data.description).toEqual(project.description);
  });

  it('a auth user can not get others project', async () => {
    const loginToken = await signIn(request);
    const data = factory.build('projectFactory');
    // create
    const project = await Project.create(data);
    // get

    let response = await request
      .get(`/projects/${project._id}`)
      .set('authorization', `Bearer ${loginToken}`)
      .expect(401);

    expect(response.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
  });

  it('a auth user can not get others projects', async () => {
    const loginToken = await signIn(request);
    const data = factory.build('projectFactory');
    // create
    await Project.create(data);
    // get

    let response = await request.get(`/projects`).set('authorization', `Bearer ${loginToken}`).expect(200);

    expect(response.body.data).toEqual([]);
  });

  it('project require a title', async () => {
    const loginToken = await signIn(request);
    const project = factory.build('projectFactory', { title: null });

    let response = await request
      .post('/projects')
      .set('authorization', `Bearer ${loginToken}`)
      .send(project)
      .expect(400);

    expect(response.body.errors).toContainEqual({
      field: 'title',
      message: 'Please add a title',
    });
  });

  it('project require a description', async () => {
    const loginToken = await signIn(request);
    const project = factory.build('projectFactory', { description: null });

    let response = await request
      .post('/projects')
      .set('authorization', `Bearer ${loginToken}`)
      .send(project)
      .expect(400);

    expect(response.body.errors).toContainEqual({
      field: 'description',
      message: 'Please add a description',
    });
  });
});
