const BookType = require("../schema/Book");
const { validateAuth } = require("../middleware/auth");
const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const bookResolver = require("../resolvers/Book");

const createBook = {
  type: BookType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLString) },
    keywords: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
  },
  resolve: validateAuth(bookResolver.createBook)
};

module.exports = {
  createBook
};
