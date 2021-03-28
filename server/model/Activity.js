// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end---------------------

const activitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
  },
  subject: {
    type: String,
  },
  changes: {
    type: Object,
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
// export model
module.exports = mongoose.model('Activity', activitySchema);
