const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  sdf: {
    type: String,
    required: true,
  },
  fasd: {
    type: String,
    required: true,
  },
  afsdfdsa: {
    type: Number,
    default: 0,
  },
  adsfdas: {
    type: Number,
    default: 0,
  },
});

const User = model('User', userSchema);

module.exports = User;
