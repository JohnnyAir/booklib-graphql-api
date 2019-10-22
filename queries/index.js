const { GraphQLObjectType } = require("graphql");
const glob = require("glob");
const cwd = "./queries";
const pattern = "**/*.js";

const query_modules = glob.sync(pattern, { cwd });

const queries = {};

query_modules.forEach(filepath => {
  const module_queries = /index.js/.test(filepath)
    ? {}
    : require(`./${filepath}`);
  Object.assign(queries, module_queries);
});

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...queries
  }
});
