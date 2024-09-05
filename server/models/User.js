const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
    },
    goal: {
      type: String,
      required: false
    },
    nutrients: {
      type: String,
      required: false
    },
    allergies: {
      type: String,
      required: false
    }
  }
);

const User = model('User', userSchema);

module.exports = User;