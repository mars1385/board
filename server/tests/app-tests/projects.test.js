// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const { dbDisconnect } = require('../../config/db');
const Project = require('../../model/Project');
// -----------------end--------------------

const request = supertest(app);

describe('user working with project', () => {
  afterAll(async () => {
    await dbDisconnect();
  });
  it('can create a project', async (done) => {
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
});
