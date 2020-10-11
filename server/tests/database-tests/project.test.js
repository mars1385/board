// -----------------imports-----------------
const app = require('../../app');
const Project = require('../../model/Project');
const { dbDisconnect } = require('../../config/db');
// -----------------end--------------------

describe('project model method', () => {
  afterAll(async () => {
    await Project.deleteMany();
    await dbDisconnect();
  });

  it('it has a path', async (done) => {
    const data = {
      title: 'test',
      description: 'test',
    };
    const project = await Project.create(data);
    expect(project.getPath()).toEqual(`/projects/${project._id}`);
    done();
  });
});
