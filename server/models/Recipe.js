const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  recipe_name: {
    type: String,
    required: true,
  },
  recipe_types: [String],
  cooking_time_min: String,
  recipe_image: String,
  recipe_api_xref: String,
  recipe_description: String,
  recipe_ingredients: [
    {
      food_name: String,
      ingredient_description: String,
    }
  ],
  number_of_servings: String,
  grams_per_portion: String,
  serving_sizes: {
    serving: {
      calcium: String,
      calories: String,
      carbohydrates: String,
      cholesterol: String,
      fat: String,
      fiber: String,
      iron: String,
      monounsaturated_fat: String,
      polyunsaturated_fat: String,
      potassium: String,
      protein: String,
      saturated_fat: String,
      serving_size: String,
      sodium: String,
      sugar: String,
      trans_fat: String,
      vitamin_a: String,
      vitamin_c: String,
    }
  },
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
  rating: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment' //references the Comment model
      }
  ]
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;