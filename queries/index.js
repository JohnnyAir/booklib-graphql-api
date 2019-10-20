const { GraphQLObjectType } = require("graphql");
const UserType = require("../graphql-models/User");
const { validateAuth } = require("../middleware/auth");
const userResolver = require("../resolvers/User");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    me: {
      type: UserType,
      resolve: validateAuth(userResolver.getMyProfile)
    }
  }
});

module.exports = RootQuery;
