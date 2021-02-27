// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end---------------------

const taskSchema = new mongoose.Schema({
  body: {
    type: String,
    trim: true,
    required: [true, 'Please add a body'],
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
  },
});

// method

// export model
module.exports = mongoose.model('task', taskSchema);
