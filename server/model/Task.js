// -----------------imports-----------------
const mongoose = require('mongoose');
const Project = require('./Project');
const Activity = require('./Activity');
// -----------------end---------------------

const taskSchema = new mongoose.Schema({
  body: {
    type: String,
    trim: true,
    required: [true, 'Please add a body'],
  },
  status: {
    type: Boolean,
    default: false,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'Task need to belong a project'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// method
taskSchema.pre('save', async function (next) {
  const date = Date.now();

  const project = await Project.updateOne({ _id: this.project }, { updatedAt: date });

  await Activity.create({ owner: project.owner, project: this.project, description: 'create_task' });
  next();
});
taskSchema.pre('findOneAndUpdate', async function (next) {
  const date = Date.now();

  const { status } = this.getUpdate();
  const taskToUpdate = await this.model.findOne(this.getFilter());

  const project = await Project.updateOne({ _id: this.project }, { updatedAt: date });

  await Activity.create({
    owner: project.owner,
    project: taskToUpdate.project,
    description: status ? 'completed_task' : 'unCompleted_task',
  });
  this.set({ updatedAt: date });
  next();
});
// export model
module.exports = mongoose.model('Task', taskSchema);
