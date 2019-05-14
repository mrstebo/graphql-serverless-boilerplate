const { gql } = require("apollo-server-lambda");

const base = gql`
  type Query {
    serverTime: String!
  }

  type Mutation {
    test(x: String): String
  }
`;

module.exports = [
  base,
  require("./modules/products/typeDef"),
];
