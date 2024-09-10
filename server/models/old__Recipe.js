const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  api_recipe_id: {
    type: Number,
    required: true,
  },
  recipe_name: {
    type: String,
    required: true,
  },
  recipe_description: String,
  recipe_image: String,
  recipe_ingredients: {
    ingredient: [String],  // List of ingredient names
  },
  recipe_nutrition: {
    calories: String,
    carbohydrate: String,
    fat: String,
    protein: String,
  },
  //begin stuff from second API call for the ID they liked. This stuff is optional for sanity's sake.
  directions: [
    {
      direction_description: String,
      direction_number: Number,
    }
  ],
  ingredients: [
    {
      food_id: String,
      food_name: String,
      ingredient_description: String,
      ingredient_url: String,
      measurement_description: String,
      number_of_units: String,
      serving_id: String,
    }
  ],
  grams_per_portion: String,
  number_of_servings: String,
  rating: String,
  serving_sizes: {
    serving_size: String,
    calories: String,
    carbohydrate: String,
    cholesterol: String,
    fat: String,
    fiber: String,
    iron: String,
    monounsaturated_fat: String,
    polyunsaturated_fat: String,
    potassium: String,
    protein: String,
    saturated_fat: String,
    sodium: String,
    sugar: String,
    trans_fat: String,
    vitamin_a: String,
    vitamin_c: String,
  },
  recipe_types: {
    recipe_type: [String],
  }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;