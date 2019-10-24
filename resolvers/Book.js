const Book = require("../models/Book");

const getBooks = async (_, args) => {
  return await Book.find({ ...args });
};

const getBook = async (_, { id }) => {
  return await Book.findById(id);
};

const createBook = async (_, args) => {
  const book = new Book({ ...args });
  return await book.save();
};

const getAuthorBooks = async authorId => await Book.findById(authorId);

module.exports = {
  getAuthorBooks,
  getBooks,
  getBook,
  createBook
};
