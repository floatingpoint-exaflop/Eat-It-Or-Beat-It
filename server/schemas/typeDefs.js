const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  recipes: [Recipe] # User's saved recipes
}

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }


type Recipe {
  _id: ID!
  api_recipe_id: Int!
  recipe_name: String!
  recipe_description: String
  recipe_image: String
  recipe_ingredients: RecipeIngredients
  recipe_nutrition: RecipeNutrition
  directions: [Direction]
  ingredients: [Ingredient]
  grams_per_portion: String
  number_of_servings: String
  rating: String
  serving_sizes: ServingSizes
  recipe_types: [String]
}
  type RecipeIngredients {
    ingredient: [String] # List of ingredient names
  }
  type RecipeNutrition {
    calories: String
    carbohydrate: String
    fat: String
    protein: String
  }
  type Direction {
    direction_description: String
    direction_number: Int
  }
  type Ingredient {
    food_id: String
    food_name: String
    ingredient_description: String
    ingredient_url: String
    measurement_description: String
    number_of_units: String
    serving_id: String
  }
  type ServingSizes {
    serving_size: String
    calories: String
    carbohydrate: String
    cholesterol: String
    fat: String
    fiber: String
    iron: String
    monounsaturated_fat: String
    polyunsaturated_fat: String
    potassium: String
    protein: String
    saturated_fat: String
    sodium: String
    sugar: String
    trans_fat: String
    vitamin_a: String
    vitamin_c: String
  }

    input AddRecipeInput {
      api_recipe_id: Int!
      recipe_name: String!
      recipe_description: String
      recipe_image: String
      recipe_ingredients: RecipeIngredientsInput
      recipe_nutrition: RecipeNutritionInput
    }
    input RecipeIngredientsInput {
      ingredient: [String]
    }
    input RecipeNutritionInput {
      calories: String
      carbohydrate: String
      fat: String
      protein: String
    }


type Comment {
  _id: ID!
  commentBody: String!
  rating: Int!
  api_recipe_id: Int!
  user: User!
  recipe: Recipe!
  createdAt: String!
  updatedAt: String!
}
input AddCommentInput {
  commentBody: String!
  rating: Int!
  api_recipe_id: Int!
  user: ID!
  recipe: ID!
}

type Query {
  getUsers: [User]
  getUser(id: ID!): User
  getRecipes: [Recipe]
  getSingleRecipe(id: ID!): Recipe
  getComments: [Comment]
  getSingleComment(id: ID!): Comment
}

type Mutation {
  addUser(input: CreateUserInput): User
  addRecipe(input: AddRecipeInput): Recipe
  addComment(input: AddCommentInput): Comment
}
`;

module.exports = typeDefs;