const { GraphQLNonNull, GraphQLID } = require("graphql");
const { AuthorType } = require("../schema/Schema");
const authorResolver = require("../resolvers/Author");
const { validateAuth } = require("../middleware/auth");

const author = {
  type: AuthorType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: validateAuth(authorResolver.getAuthor)
};

const authors = {
  type: AuthorType,
  resolve: validateAuth(authorResolver.getAuthors)
};

module.exports = {
  author,
  authors
};
