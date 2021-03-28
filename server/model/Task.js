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
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Task need to belong a user'],
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

  await Project.updateOne({ _id: this.project }, { updatedAt: date });

  await Activity.create({
    user: this.owner,
    project: this.project,
    description: 'create_task',
    subject: this.body,
  });
  next();
});
taskSchema.pre('findOneAndUpdate', async function (next) {
  const date = Date.now();

  const { status, body } = this.getUpdate();
  const taskToUpdate = await this.model.findOne(this.getFilter());

  await Project.updateOne({ _id: this.project }, { updatedAt: date });
  await Activity.create({
    user: taskToUpdate.owner,
    project: taskToUpdate.project,
    description: status ? 'completed_task' : 'unCompleted_task',
    subject: body,
  });
  this.set({ updatedAt: date });
  next();
});

taskSchema.pre('remove', async function (next) {
  const date = Date.now();
  await Project.updateOne({ _id: this.project }, { updatedAt: date });

  await Activity.create({
    user: this.owner,
    project: this.project,
    subject: this.body,
    description: 'remove_task',
  });

  next();
});
// export model
module.exports = mongoose.model('Task', taskSchema);
