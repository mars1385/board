// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end---------------------

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    generalNote: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Project need owner'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reverse populate with virtual
projectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'project',
  justOne: false,
});

// method
projectSchema.pre('findOneAndUpdate', async function (next) {
  const date = Date.now();
  this.set({ updatedAt: date });
  next();
});

projectSchema.pre('remove', async function (next) {
  await this.model('Task').deleteMany({ project: this._id });
  next();
});

// export model
module.exports = mongoose.model('Project', projectSchema);
