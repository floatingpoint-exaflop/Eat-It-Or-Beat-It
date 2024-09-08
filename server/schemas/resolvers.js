const { User, Recipe, Comment } = require('../models');

const resolvers = {
  Query: {
    // Fetch all recipes for a user
    getRecipes: async (parent, { userId }) => {
      const user = await User.findById(userId).populate('recipes');
      return user.recipes;
    },

    // Fetch a single recipe by ID for a user
    getSingleRecipe: async (parent, { recipeId, userId }) => {
      const user = await User.findById(userId).populate({
        path: 'recipes',
        match: { _id: recipeId },
      });
      return user.recipes[0];
    },

    // Fetch all comments for a specific recipe
    getComments: async (parent, { recipeId }) => {
      return Comment.find({ recipe: recipeId });
    },

    // Fetch a single comment by ID
    getSingleComment: async (parent, { commentId }) => {
      return Comment.findById(commentId);
    },

    // Fetch a single user by ID
    getSingleUser: async (parent, { userId }) => {
      return User.findById(userId).populate('recipes');
    },
  },

  Mutation: {
    // Add a recipe for a user
    addRecipe: async (parent, { userId, recipeData }) => {
      const recipe = await Recipe.create(recipeData);
      await User.findByIdAndUpdate(userId, { $push: { recipes: recipe._id } });
      return recipe;
    },

    // Add a comment to a recipe by a user
    addComment: async (parent, { recipeId, userId, commentBody, rating }) => {
      const comment = await Comment.create({
        commentBody,
        rating,
        recipe: recipeId,
        user: userId,
      });
      return comment;
    },

    // Add a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      return user;
    },
  },

  //Resolvers for fields that need to reference other models
  Recipe: {
    comments: async (parent) => {
      return Comment.find({ recipe: parent._id });
    },
  },

  User: {
    recipes: async (parent) => {
      return Recipe.find({ _id: { $in: parent.recipes } });
    },
  },

  Comment: {
    user: async (parent) => {
      return User.findById(parent.user);
    },
    recipe: async (parent) => {
      return Recipe.findById(parent.recipe);
    },
  },
};

module.exports = resolvers;