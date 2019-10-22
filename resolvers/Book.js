const Book = require("../models/Book");

const getMyBooks = async (_, args, { auth }) => {
  return await Book.find({ ...args, createdBy: auth.currentUser.id });
};

const createBook = async (_, args, { auth }) => {
  const { currentUser } = auth;
  const book = new Book({
    ...args,
    createdBy: currentUser.id
  });
  return await book.save();
};

module.exports = {
  getMyBooks,
  createBook
};
