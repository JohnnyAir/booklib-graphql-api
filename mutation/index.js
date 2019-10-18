const { GraphQLObjectType } = require("graphql");

const RootQuery = new GraphQLObjectType({ name: "Mutation", fields: {} });

module.exports = RootQuery;
