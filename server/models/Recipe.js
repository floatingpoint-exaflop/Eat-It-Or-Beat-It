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
  },
  username: {
    type: String,
    required: true
  }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;

//fields that we need for this project
// swiped right recipes id (array)
//userId 
