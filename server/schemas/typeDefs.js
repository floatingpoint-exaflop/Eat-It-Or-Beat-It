//These very well might all work but I honestly forgot about them...--Tim

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
  recipe_name: String!
  recipe_types: [String]
  cooking_time_min: String
  recipe_image: String
  recipe_api_xref: String
  recipe_description: String
  recipe_ingredients: [RecipeIngredient]
  number_of_servings: String
  grams_per_portion: String
  serving_sizes: ServingSizes
  directions: [Direction]
  ingredients: [Ingredient]
  rating: String
  comments: [Comment]
}

type RecipeIngredient {
  food_name: String
  ingredient_description: String
}

type ServingSizes {
  calcium: String
  calories: String
  carbohydrates: String
  cholesterol: String
  fat: String
  fiber: String
  iron: String
  monounsaturated_fat: String
  polyunsaturated_fat: String
  potassium: String
  protein: String
  saturated_fat: String
  serving_size: String
  sodium: String
  sugar: String
  trans_fat: String
  vitamin_a: String
  vitamin_c: String
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

input AddRecipeInput {
  recipe_name: String!
  recipe_types: [String]
  cooking_time_min: String
  recipe_images: [String]
  recipe_description: String
  recipe_ingredients: [RecipeIngredientInput]
  number_of_servings: String
  grams_per_portion: String
  directions: [DirectionInput]
  ingredients: [IngredientInput]
  rating: String
}

input RecipeIngredientInput {
  food_name: String
  ingredient_description: String
}

input DirectionInput {
  direction_description: String
  direction_number: Int
}

input IngredientInput {
  food_id: String
  food_name: String
  ingredient_description: String
  ingredient_url: String
  measurement_description: String
  number_of_units: String
  serving_id: String
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
  getUser(id: ID!): User
  getRecipes(userId: ID!): [Recipe] # Fetch all recipes for a specific user
  getSingleRecipe(id: ID!): Recipe
  getComments(recipeId: ID!): [Comment]
  getSingleComment(id: ID!): Comment
}

type Mutation {
  addUser(input: CreateUserInput): User
  addRecipe(userId: ID!, input: AddRecipeInput): Recipe
  addComment(input: AddCommentInput): Comment
}
`;

module.exports = typeDefs;