// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const factory = require('../../test/factory/Factory');
const { signIn } = require('../../test/helper');
const Project = require('../../model/Project');
const Activity = require('../../model/Activity');
// -----------------end--------------------

const request = supertest(app);

describe('creating activity', () => {
  it('creating project ', async () => {
    const project = await Project.create(factory.build('projectFactory'));

    const projectActivity = await Activity.find({ project: project._id });

    expect(projectActivity).toHaveLength(1);
    expect(projectActivity[0].description).toEqual('created');
  });

  it('updating project ', async () => {
    const project = await Project.create(factory.build('projectFactory'));

    await Project.findByIdAndUpdate(
      project._id,
      { title: 'changed' },
      {
        runValidators: true,
        new: true,
      }
    );

    const projectActivity = await Activity.find({ project: project._id });

    expect(projectActivity).toHaveLength(2);
    expect(projectActivity[1].description).toEqual('updated');
  });

  it('creating task for project ', async () => {
    const { project } = await new global.Project({ task: 1 }).create();

    const projectActivity = await Activity.find({ project: project._id });

    expect(projectActivity).toHaveLength(2);
    expect(projectActivity[projectActivity.length - 1].description).toEqual('create_task');
  });

  it('completing task for project ', async () => {
    const loginToken = await signIn(request);
    const { project, task } = await new global.Project({ loginToken, task: 1 }).create();

    await request
      .patch(`/projects/${project.id}/tasks/${task.id}`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'changed', status: true })
      .expect(200);

    const projectActivity = await Activity.find({ project: project._id });

    expect(projectActivity).toHaveLength(3);
    expect(projectActivity[projectActivity.length - 1].description).toEqual('completed_task');
  });

  it('inCompleting task for project ', async () => {
    const loginToken = await signIn(request);
    const { project, task } = await new global.Project({ loginToken, task: 1 }).create();

    await request
      .patch(`/projects/${project.id}/tasks/${task.id}`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'changed', status: true })
      .expect(200);

    await request
      .patch(`/projects/${project.id}/tasks/${task.id}`)
      .set('authorization', `Bearer ${loginToken}`)
      .send({ body: 'changed', status: false })
      .expect(200);

    const projectActivity = await Activity.find({ project: project._id });

    expect(projectActivity).toHaveLength(4);
    expect(projectActivity[projectActivity.length - 1].description).toEqual('unCompleted_task');
  });
});
