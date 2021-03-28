// -----------------imports-----------------
const app = require('../../app');
const Project = require('../../model/Project');
const factory = require('../../test/factory/Factory');
const { signIn } = require('../../test/helper');
const User = require('../../model/User');
// -----------------end--------------------

describe('Project user', () => {
  it('A project can invite user', async () => {
    const project = await Project.create(factory.build('projectFactory'));

    const user = await User.create(factory.build('userFactory'));

    await project.invite(user._id);

    expect(project.members).toContain(user._id);
  });
});
