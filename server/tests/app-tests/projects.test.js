// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const { dbDisconnect } = require('../../config/db');
const Project = require('../../model/Project');
// -----------------end--------------------

const request = supertest(app);

describe('user working with project', () => {
  afterAll(async () => {
    await Project.deleteMany();
    await dbDisconnect();
  });
  it('user can create a project', async (done) => {
    const data = {
      title: 'test',
      description: 'test',
    };

    let response = await request.post('/projects').send(data);

    expect(response.status).toBe(201);
    expect(response.body.data.title).toEqual(data.title);
    expect(response.body.data.description).toEqual(data.description);
    // see in dataBase
    const project = await Project.findById(response.body.data._id);
    expect(project.title).toEqual(data.title);
    expect(project.description).toEqual(data.description);
    done();
  });

  it('project require a title', async (done) => {
    const data = {
      description: 'test',
    };
    let response = await request.post('/projects').send(data);
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Please add a title');
    done();
  });

  it('project require a description', async (done) => {
    const data = {
      title: 'test',
    };
    let response = await request.post('/projects').send(data);
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Please add a description');
    done();
  });

  it('user can get a project', async (done) => {
    const data = {
      title: 'test',
      description: 'test',
    };

    const project = await Project.create(data);
    let response = await request.get(project.getPath());
    expect(response.status).toBe(200);
    expect(response.body.data.title).toEqual(project.title);
    expect(response.body.data.description).toEqual(project.description);
    done();
  });
});
