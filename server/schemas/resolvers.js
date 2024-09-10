//These very well might all work but I honestly forgot about them...--Tim

const { User, Recipe, Comment } = require('../models');

const resolvers = {
  Query: {
    // Fetch all recipes for a user
    getRecipes: async (parent, { userId }) => {
      const user = await User.findById(userId).populate('recipes');
      return user.recipes;
    },

    // Fetch a single recipe by ID
    getSingleRecipe: async (parent, { id }) => {
      return Recipe.findById(id);
    },

    // Fetch all comments for a specific recipe
    getComments: async (parent, { recipeId }) => {
      return Comment.find({ recipe: recipeId });
    },

    // Fetch a single comment by ID
    getSingleComment: async (parent, { id }) => {
      return Comment.findById(id);
    },

    // Fetch a single user by ID
    getUser: async (parent, { id }) => {
      return User.findById(id).populate('recipes');
    },
  },

  Mutation: {
    addUser: async (parent, { input }) => {
      const { username, email, password } = input;
      const user = await User.create({ username, email, password });
      return user;
    },
    
    addRecipe: async (parent, { userId, input }) => {
      const recipe = await Recipe.create(input);
      await User.findByIdAndUpdate(userId, { $push: { recipes: recipe._id } });
      return recipe;
    },
  
    addComment: async (parent, { input }) => {
      const { recipe, user, commentBody, rating } = input;
      const comment = await Comment.create({
        commentBody,
        rating,
        recipe,
        user,
      });
      return comment;
    },
  },

  // Resolvers for fields that need to reference other models
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
