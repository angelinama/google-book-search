import axios from "axios";
require("dotenv").config();

const APIKey = process.env.REACT_APP_APIKey;
console.log("apikey: ", APIKey);

const API = {
  // Gets all books
  getBooks: function (search) {
    return axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10&printType=books&key=${APIKey}`
    );
  },
  getSavedBooks: function () {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
};

export default API;
