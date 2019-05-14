const { gql } = require("apollo-server-lambda");

module.exports = gql`
  extend type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  extend type Mutation {
    addProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Product
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    hidden: Boolean!
  }

  input ProductInput {
    name: String
    description: String
    price: Float
    hidden: Boolean
  }
`;
