const { AuthorType } = require("../schema/Schema");
const { validateAuth } = require("../middleware/auth");
const { GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");
const authorResolver = require("../resolvers/Author");

const createAuthor = {
  type: AuthorType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: validateAuth(authorResolver.createAuthor)
};

const deleteAuthor = {
  type: AuthorType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: validateAuth(authorResolver.deleteAuthor)
};

module.exports = {
  createAuthor,
  deleteAuthor
};
