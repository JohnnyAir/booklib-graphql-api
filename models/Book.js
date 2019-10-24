const { Schema, model } = require("mongoose");

const Book = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  authorId: { type: String, required: true },
  price: { type: Number, required: true },
  keywords: { type: Array },
  timeCreated: { type: Date, required: true, default: Date.now() }
});

module.exports = model("Book", Book);
