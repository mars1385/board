// -----------------imports-----------------
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// -----------------end---------------------

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be more than 5 character'],
    select: false,
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
// hash password before storing
userSchema.pre('save', async function (next) {
  const user = this;
  // check to see password modified
  if (!user.isModified('password')) next();
  // hashing
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
}); //end
// compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  const user = this;
  const isMatch = await bcrypt.compare(enteredPassword, user.password);
  return isMatch;
}; // end
userSchema.methods.generateJwtToken = function () {
  const user = this;
  const token = jwt.sign({ name: user.name, id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  return token;
}; // end
// export model
module.exports = mongoose.model('User', userSchema);
