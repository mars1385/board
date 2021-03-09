// -----------------imports-----------------
const mongoose = require('mongoose');
const Project = require('./Project');
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
  await Project.findByIdAndUpdate(
    this.project,
    { updatedAt: date },
    {
      new: true,
      runValidators: true,
    }
  );
  next();
});
taskSchema.pre('findOneAndUpdate', async function (next) {
  const date = Date.now();

  const taskToUpdate = await this.model.findOne(this.getFilter());

  console.log(date.toString());
  await Project.findByIdAndUpdate(
    taskToUpdate.project,
    { updatedAt: date },
    {
      new: true,
      runValidators: true,
    }
  );
  this.set({ updatedAt: date });
  next();
});
// export model
module.exports = mongoose.model('task', taskSchema);
