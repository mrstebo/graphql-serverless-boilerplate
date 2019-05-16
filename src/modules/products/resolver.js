module.exports = {
  Query: {
    getProducts: (_root, _args, { Products }) => Products.find(),
    getProduct: (_, { id }, { Products }) => Products.get(id),
  },
  Mutation: {
    addProduct: (_, { input }, { Products }) => {
      const newItem = Products.insert(input);
      return newItem;
    },
    updateProduct: (_, { id, input }, { Products }) => {
      const item = Products.get(id);
      const updatedItem = Products.update({
        ...item,
        ...input,
      });
      return updatedItem;
    },
    deleteProduct: (_, { id }, { Products }) => {
      const item = Products.get(id);
      Products.remove(item);
      return { $loki: id, ...item };
    },
  },
  Product: {
    id: product => product["$loki"],
  },
};
