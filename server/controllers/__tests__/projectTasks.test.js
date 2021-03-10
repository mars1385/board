// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const Project = require('../../model/Project');
const Task = require('../../model/Task');
const factory = require('../../test/factory/Factory');
const { signIn } = require('../../test/helper');
// -----------------end--------------------

const request = supertest(app);

describe('user working with project tasks', () => {
  it('guest can not add task to project', async () => {
    const newProject = await Project.create(factory.build('projectFactory'));

    const taskResponse = await request
      .post(`/projects/${newProject.id}/tasks`)
      .send({ body: 'test task' })
      .expect(401);

    expect(taskResponse.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
  });

  it('only owner of project cant add task', async () => {
    const loginToken = await signIn(request);

    const project = await Project.create(factory.build('projectFactory'));

    const taskResponse = await request
      .post(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'test task' })
      .expect(401);

    expect(taskResponse.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
  });

  it('only owner of project can update task', async () => {
    const loginToken = await signIn(request);

    const { project, task } = await new global.Project({ task: 1 }).create();

    const updateTaskResponse = await request
      .patch(`/projects/${project.id}/tasks/${task.id}`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'changed', status: true })
      .expect(401);

    const getTask = await Task.findById(task._id);

    expect(updateTaskResponse.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
    expect(getTask.toString()).toEqual(task.toString());
  });

  it('a project can only update their own task', async () => {
    const loginToken = await signIn(request);

    const { project } = await new global.Project({ loginToken }).create();

    const task = await Task.create(factory.build('taskFactory'));

    const updateTaskResponse = await request
      .patch(`/projects/${project.id}/tasks/${task.id}`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'changed', status: true })
      .expect(401);

    const getTask = await Task.findById(task._id);

    expect(updateTaskResponse.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
    expect(getTask.toString()).toEqual(task.toString());
  });

  it('a project can have tasks', async () => {
    const loginToken = await signIn(request);

    const { project } = await new global.Project({ loginToken }).create();

    const task = await request
      .post(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'test task' })
      .expect(201);

    const tasksResponse = await request
      .get(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .expect(200);

    expect(tasksResponse.body.data.toString()).toContain(task.toString());
  });

  it('a project task can be updated', async () => {
    const loginToken = await signIn(request);

    const { project, task } = await new global.Project({ loginToken, task: 1 }).create();

    const updateTaskResponse = await request
      .patch(`/projects/${project.id}/tasks/${task.id}`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'changed', status: true })
      .expect(200);

    const getTask = await Task.findById(updateTaskResponse.body.task._id);

    expect(updateTaskResponse.body.task.body).toEqual(getTask.body);
    expect(updateTaskResponse.body.task.status).toBeDefined();
    expect(updateTaskResponse.body.task.status).toEqual(getTask.status);
  });

  it('a task require body', async () => {
    const loginToken = await signIn(request);

    const { project } = await new global.Project({ loginToken }).create();

    const task = factory.build('taskFactory', { body: null, project: project.id });

    const taskResponse = await request
      .post(`/projects/${project.id}/tasks`)
      .set('authorization', `Bearer ${loginToken}`)
      .send(task)
      .expect(400);

    expect(taskResponse.body.errors).toContainEqual({
      field: 'body',
      message: 'Please add a body',
    });
  });
});
