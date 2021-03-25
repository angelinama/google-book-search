import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    // searchBooks();
    console.log(books);
  }, [books]);

  // Loads 10 books from Google search and sets them to books
  function searchBooks() {
    //change the search term to a different term
    if (!formObject.search) return;
    API.getBooks(formObject.search)
      .then((res) => {
        const { items, totalItems } = res.data;

        console.log(items[0].volumeInfo);
        const books = items.map((bookObj) => {
          const book = bookObj.volumeInfo;
          const { title, authors, description, infoLink, imageLinks } = book;
          // return {
          //   title,
          //   authors,
          //   image: imageLinks ? imageLinks.thumbnail : "",
          //   description,
          //   link: infoLink,
          // };
          return { title, author: authors, _id: infoLink };
        });
        console.log(books);
        setBooks(books);
      })
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();

    if (formObject.search) {
      searchBooks();
    }
  }

  return (
    <Container fluid>
      <Jumbotron>
        <h1>(React) Google Books Search</h1>
        <h3>Search for and Save Books of Internet</h3>
      </Jumbotron>
      <Row>
        <Col size="md-12">
          <h3>Book Search</h3>
          <br></br>
          <form>
            <label htmlFor="search">Book</label>
            <Input
              onChange={handleInputChange}
              name="search"
              id="search"
              placeholder="Title, author, despcripton, etc. of a books (required)"
            />

            <FormBtn disabled={!formObject.search} onClick={handleFormSubmit}>
              Search
            </FormBtn>
          </form>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <h3>Results</h3>
          <br></br>
          <List>
            {books.map((book) => (
              <ListItem key={book._id}>
                <Link to={"/books/" + book._id}>
                  <strong>
                    {book.title} by {book.author}
                  </strong>
                </Link>
                <DeleteBtn onClick={() => deleteBook(book._id)} />
              </ListItem>
            ))}
          </List>
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
