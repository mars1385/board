// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const Project = require('../../model/Project');
const factory = require('../../test/factory/Factory');
const { signIn } = require('../../test/helper');
const Task = require('../../model/Task');
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

  it('a user can update a project', async () => {
    const loginToken = await signIn(request);

    const { project } = await new global.Project({ loginToken }).create();

    const projectUpdateResponse = await request
      .patch(`/projects/${project._id}`)
      .send({
        generalNote: 'changed',
        title: 'change',
        description: 'changed',
      })
      .set('authorization', `Bearer ${loginToken}`)
      .expect(200);

    const updatedProject = await Project.findOne({ _id: project._id, owner: project.owner });

    expect(projectUpdateResponse.body.project.generalNote).toEqual(updatedProject.generalNote);
    expect(projectUpdateResponse.body.project.title).toEqual(updatedProject.title);
    expect(projectUpdateResponse.body.project.description).toEqual(updatedProject.description);
  });

  it('a user can delete a project', async () => {
    const loginToken = await signIn(request);

    const { project, task } = await new global.Project({ loginToken, task: 1 }).create();

    await request
      .delete(`/projects/${project._id}`)
      .send({})
      .set('authorization', `Bearer ${loginToken}`)
      .expect(200);

    const deletedProject = await Project.findOne({ _id: project._id, owner: project.owner });
    const deletedProjectTasks = await Task.find({ project: project._id });

    expect(deletedProject).toBe(null);
    expect(deletedProjectTasks).toEqual([]);
  });

  it('a user can get their project', async () => {
    const loginToken = await signIn(request);

    const { project } = await new global.Project({ loginToken }).create();

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
    // create
    const project = await Project.create(factory.build('projectFactory'));
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
    // create
    await Project.create(factory.build('projectFactory'));
    // get

    let response = await request.get(`/projects`).set('authorization', `Bearer ${loginToken}`).expect(200);

    expect(response.body.data).toEqual([]);
  });

  it('a auth user can not update others project', async () => {
    const loginToken = await signIn(request);
    // create
    const project = await Project.create(factory.build('projectFactory'));
    // get

    let response = await request
      .patch(`/projects/${project._id}`)
      .set('authorization', `Bearer ${loginToken}`)
      .expect(401);

    expect(response.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
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
