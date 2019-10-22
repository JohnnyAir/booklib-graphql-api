const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = require("graphql");

const BookType = require("../schema/Book");
const bookResolver = require("../resolvers/Book");
const { validateAuth } = require("../middleware/auth");

const book = {
  type: BookType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: validateAuth(bookResolver.getABook)
};

const books = {
  type: BookType,
  args: {
    genre: { type: GraphQLString },
    keywords: { type: new GraphQLList(GraphQLString) }
  },
  resolve: validateAuth(bookResolver.getMyBooks)
};

module.exports = {
  book,
  books
};
