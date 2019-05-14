const base = {
  Query: {
    serverTime: () => new Date(),
  },
  Mutation: {
    test: (_, { x }) => x,
  },
};

const productsResolver = require("./modules/products/resolver");

module.exports = {
  ...base,
  ...productsResolver,
};
