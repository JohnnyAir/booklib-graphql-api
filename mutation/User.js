const { UserType } = require("../schema/Schema");
const { validateAuth } = require("../middleware/auth");
const { GraphQLNonNull, GraphQLString } = require("graphql");
const userResolver = require("../resolvers/User");

const createUser = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: userResolver.createUser
};

const login = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: userResolver.login
};

const changeProfileName = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: validateAuth(userResolver.changeProfileName)
};

const changePassword = {
  type: UserType,
  args: {
    current_password: { type: new GraphQLNonNull(GraphQLString) },
    new_password: { type: new GraphQLNonNull(GraphQLString) },
    confirm_new_password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: validateAuth(userResolver.changePassword)
};

module.exports = {
  createUser,
  login,
  changeProfileName,
  changePassword
};
