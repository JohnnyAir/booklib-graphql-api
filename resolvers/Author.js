const Author = require("../models/Author");

const getAuthors = async () => {
  return await Author.find({});
};

const getAuthor = async (_, { id }) => {
  return await Author.findById(id);
};

const createAuthor = async (_, args) => {
  return await new Author({ ...args }).save();
};

const deleteAuthor = async (_, { id }) => {
  await Author.deleteOne({ _id: id });
  return null;
};

module.exports = {
  deleteAuthor,
  createAuthor,
  getAuthor,
  getAuthors
};
