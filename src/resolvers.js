const _ = require("lodash");

const base = {
  Query: {
    serverTime: () => new Date(),
  },
  Mutation: {
    test: (_, { x }) => x,
  },
};

module.exports = _.merge(
  base,
  require("./modules/products/resolver"),
);
