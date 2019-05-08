const { ApolloServer } = require("apollo-server-lambda");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const server = new ApolloServer({
  resolvers,
  typeDefs,
  playground: {
    settings: {
      "request.credentials": "same-origin",
    },
    endpoint: "/graphql",
  },
});
const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});

module.exports = (event, context) => new Promise((resolve, reject) => {
  handler(event, context, (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});
