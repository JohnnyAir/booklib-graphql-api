const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = require("graphql");

const { BookType } = require("../schema/Schema");
const bookResolver = require("../resolvers/Book");
const { validateAuth } = require("../middleware/auth");

const book = {
  type: BookType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: validateAuth(bookResolver.getBook)
};

const books = {
  type: BookType,
  args: {
    genre: { type: GraphQLString },
    keywords: { type: new GraphQLList(GraphQLString) }
  },
  resolve: validateAuth(bookResolver.getBooks)
};

module.exports = {
  book,
  books
};
