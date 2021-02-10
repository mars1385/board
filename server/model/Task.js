// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end---------------------

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title'],
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
