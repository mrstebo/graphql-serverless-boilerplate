const MOCK_PRODUCTS = [...Array(10).keys()].map(i => ({
  id: i+1,
  name: `Product #${i+1}`,
  description: "This is a description",
  price: (Math.random() * 100).toFixed(2),
  hidden: Math.random() > 0.5,
}));
let id = 11;

module.exports = {
  Query: {
    getProducts: () => MOCK_PRODUCTS,
    getProduct: (_, { id }) => MOCK_PRODUCTS.find(p => p.id === id),
  },
  Mutation: {
    addProduct: (_, { input }) => {
      const newItem = { id: id++, ...input };
      MOCK_PRODUCTS.push(newItem);
      return newItem;
    },
    updateProduct: (_, { id, input }) => {
      const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
      MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], input };
      return MOCK_PRODUCTS[index];
    },
    deleteProduct: (_, { id }) => {
      const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
      const item = { ...MOCK_PRODUCTS[index] };
      delete MOCK_PRODUCTS[index];
      return item;
    },
  },
};
