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
        type: Schema.Types.ObjectId,
        ref: 'Recipe' // References the Recipe model
      }
    ],
    comments: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Comment' //references the Comment model
      }
    ]
  });


// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
}; 

const User = model('User', userSchema);

module.exports = User;