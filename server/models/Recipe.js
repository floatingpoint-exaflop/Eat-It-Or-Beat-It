const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
