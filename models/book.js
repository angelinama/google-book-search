const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  subtitle: String,
  description: String,
  image: String,
  link: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
