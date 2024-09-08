const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const cors = require('cors');
const { createProxyMiddleware } = require("http-proxy-middleware");
const { searchRecipes } = require('../client/src/utils/recipe-ext-api/exportSearchRecipesVanilla.js');
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(cors());
  // Proxy configuration
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://platform.fatsecret.com',
      changeOrigin: true,
      // pathRewrite: { '^/api': '/rest/server.api' }, //this is an old one, keeping just in case
      pathRewrite: { '^/api': '' },
      logLevel: 'debug', 
    })
  );

  app.post('/api/recipe/search', async (req, res) => {
    const searchParams = req.body; // Assumes you're sending search parameters from the frontend
    try {
        const searchResults = await searchRecipes(searchParams);
        res.json(searchResults); // Send the search results back to the frontend
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
