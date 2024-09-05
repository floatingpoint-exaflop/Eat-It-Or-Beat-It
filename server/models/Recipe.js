const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  ingredientSearched: {
    type: String,
    required: true,
    unique: true,
  },
  apiRecipeId: {
    type: String, 
    unique: true
  }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
