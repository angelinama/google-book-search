import axios from "axios";

const API = {
  // Gets all books
  getBooks: function (search) {
    return axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10&printType=books&key=AIzaSyAvaT1jnQgxBACSZYp7F3gK5iQGbIkcO4k`
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
