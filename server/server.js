const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs');  
const resolvers = require('./schemas/resolvers');

const PORT = process.env.PORT ||   3001;
const app = express();
app.use(authMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the user token from the headers
    const token = req.headers.authorization || '';

    // Add the user to the context
    return { token };
  },
});

// Apply the Apollo Server middleware to our Express app
app.use('/graphql', server.getMiddleware());

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}  

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});

