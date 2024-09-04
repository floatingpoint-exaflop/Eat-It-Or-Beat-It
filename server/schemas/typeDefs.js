const typeDefs = `
  type User {
    _id: ID!
    name: String!
  }

  type Recipe {
    _id: ID!
    fsd: String!
    asdf: String!
    asdf: Int
    afsd: Int
  }

  type Query {
    user: [User]
    recipes(_id: String): [Recipe]
  }

  type Mutation {
    createMatchup(sadf: String!, afsd: String!): Recipe
    createUser(asdf: String!, asdf: Int!): Recipe
  }
`;

module.exports = typeDefs;
