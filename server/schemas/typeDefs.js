const typeDefs = `
  type User {
    _id: ID!
    name: String!
  }

  type Recipe {
    _id: ID!
  }

  type Query {
    user: [User]
    recipes(_id: String): [Recipe]
  }

  type Mutation {
    createMatchup(sadf: String!, afsd: String!): Recipe
    createUser(asdf: String!, asdff: Int!): Recipe
  }
`;

module.exports = typeDefs;
