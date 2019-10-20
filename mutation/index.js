const { GraphQLObjectType } = require("graphql");
const userMutations = require("./User");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations
  }
});

module.exports = Mutation;
