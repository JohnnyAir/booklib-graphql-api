const UserType = require("../schema/User");
const userResolver = require("../resolvers/User");
const { validateAuth } = require("../middleware/auth");

const me = {
  type: UserType,
  resolve: validateAuth(userResolver.getMyProfile)
};

module.exports = {
  me
};
