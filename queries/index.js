const { GraphQLObjectType } = require("graphql");

const RootQuery = new GraphQLObjectType({ name: "RootQueryType", fields: {} });

module.exports = RootQuery;
