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
    trim: true,
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
module.exports = mongoose.model('project', projectSchema);
