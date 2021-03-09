// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end---------------------

const projectSchema = new mongoose.Schema({
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
});

// method
projectSchema.pre('findOneAndUpdate', async function (next) {
  const date = Date.now();
  console.log(date.toString());
  this.set({ updatedAt: date });
  next();
});

// export model
module.exports = mongoose.model('project', projectSchema);
