const { User, Recipe } = require('../models');

const resolvers = {
  Query: {
    user: async () => {

    },
    recipes: async (parent, { _id }) => {

    },
  },
  Mutation: {
    createUser: async (parent, args) => {

    },
    // createRecipe: async (parent, { _id, recipe }) => {

    // },
  },
};

module.exports = resolvers;
//Replace these blank queries with get requests for graphQL
//Replace these blank mutations with post/put/delete requests for graphQL