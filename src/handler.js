const { ApolloServer } = require("apollo-server-lambda");
const Loki = require("lokijs");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const db = new Loki("loki.json");

const loadDatabase = () => new Promise((resolve, reject) => {
  db.loadDatabase({}, (err) => {
    if (err) return reject(err);
    return resolve();
  });
});

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async () => {
    await loadDatabase();
    return {
      Products: db.getCollection("Products"),
    };
  },
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
    db.saveDatabase(() => {
      return resolve(data);
    });
  });
});
