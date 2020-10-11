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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// method
projectSchema.methods.getPath = function () {
  return `/projects/${this._id}`;
};
// export model
module.exports = mongoose.model('project', projectSchema);
