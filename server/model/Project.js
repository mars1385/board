// -----------------imports-----------------
const mongoose = require('mongoose');
const Activity = require('./Activity');
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
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

// reverse populate with virtual
// projectSchema.virtual('tasks', {
//   ref: 'Task',
//   localField: '_id',
//   foreignField: 'project',
//   justOne: false,
// });

// projectSchema.virtual('activities', {
//   ref: 'Activity',
//   localField: '_id',
//   foreignField: 'project',
//   justOne: false,
// });

// method

projectSchema.pre('save', async function (next) {
  await Activity.create({ user: this.owner, project: this._id, description: 'created' });
  next();
});
projectSchema.pre('findOneAndUpdate', async function (next) {
  const date = Date.now();
  const projectToUpdate = await this.model.findOne(this.getFilter());

  if (projectToUpdate) {
    await Activity.create({
      user: projectToUpdate.owner,
      project: projectToUpdate._id,
      description: 'updated',
      changes: this.getUpdate(),
    });
  }
  this.set({ updatedAt: date });
  next();
});

projectSchema.pre('remove', async function (next) {
  await this.model('Task').deleteMany({ project: this._id });
  await Activity.deleteMany({ project: this._id });
  next();
});

projectSchema.methods.invite = async function (userId) {
  this.members = [...this.members, userId];
  this.save();
  return;
};
// export model
module.exports = mongoose.model('Project', projectSchema);
