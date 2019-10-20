const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const { GraphQLSchema } = require("graphql");
const { getUserFromAuthToken } = require("./middleware/auth");

const query = require("./queries");
const mutation = require("./mutation");

const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost:27017/nodeapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
});

app.use("/graphql", getUserFromAuthToken);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: new GraphQLSchema({
      query,
      mutation
    }),
    graphiql: process.env.NODE_ENV === "development"
  })
);

module.exports = app;
