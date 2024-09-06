const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
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
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    recipes: [
      {
        type: String,
        trim: true,
      },
    ],
    // fName: {
    //   type: String,
    //   required: true,
    // },
    // lName: {
    //   type: String,
    //   required: true,
    // },
    // goal: {
    //   type: String,
    //   required: false
    // },
    // nutrients: {
    //   type: String,
    //   required: false
    // },
    // allergies: {
    //   type: String,
    //   required: false
    // }
  }
);


// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
}; 

const User = model('User', userSchema);

module.exports = User;