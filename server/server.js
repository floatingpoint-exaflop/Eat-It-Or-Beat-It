const express = require("express")
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

let searchRecipes;
import("../client/src/utils/recipe-ext-api/exportSearchRecipes.cjs").then(
  (module) => {
    searchRecipes = module.searchRecipes;
  }
);

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 4000;;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  // app.use(cors());
  // // Proxy configuration
  // app.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'https://platform.fatsecret.com',
  //     changeOrigin: true,
  //     // pathRewrite: { '^/api': '/rest/server.api' }, //this is an old one, keeping just in case
  //     pathRewrite: { '^/api': '' },
  //     logLevel: 'debug',
  //   })
  // );

  app.post("/api/recipe/search", async (req, res) => {
    const searchParams = req.body;
    try {
      const searchResults = await searchRecipes(searchParams);
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/graphql", expressMiddleware(server));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    console.log("Connected to the database.");
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
