const graphql = require("graphql");
const bookResolver = require("../resolvers/Book");
const authorResolver = require("../resolvers/Author");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString }
  })
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    price: { type: GraphQLString },
    keywords: { type: new GraphQLList(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: ({ authorId }) =>
        authorResolver.getAuthor(null, { id: authorId })
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: GraphQLList(BookType),
      resolve: author => bookResolver.getAuthorBooks(author.id)
    }
  })
});

module.exports = {
  AuthorType,
  BookType,
  UserType
};
