const base = {
  Query: {
    serverTime: () => new Date(),
  },
  Mutation: {
    test: (_, { x }) => x,
  },
};

module.exports = {
  ...base,
};
