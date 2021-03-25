import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({ search: "" });

  // // Load all books and store them with setBooks
  // useEffect(() => {
  //   // searchBooks();
  //   // console.log(books);
  // }, [books]);

  // Loads 10 books from Google search and sets them to books
  function searchBooks() {
    //change the search term to a different term
    if (!formObject.search) return;
    API.getBooks(formObject.search)
      .then((res) => {
        const { items } = res.data;

        // console.log(items[0].volumeInfo);
        const books = items.map((bookObj) => {
          const book = bookObj.volumeInfo;
          const {
            title,
            authors,
            description,
            infoLink,
            imageLinks,
            subtitle,
          } = book;
          return {
            title,
            subtitle,
            authors,
            image: imageLinks ? imageLinks.thumbnail : "",
            description,
            link: infoLink,
          };
          // return { title, author: authors, _id: infoLink };
        });
        // console.log(books);
        setBooks(books);
      })
      .catch((err) => console.log(err));
  }

  // // Deletes a book from the database with a given id, then reloads books from the db
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }

  //Sve a book to database and set book._id to the return _id in mongodb
  function saveBook(book) {
    // console.log(book);
    API.saveBook(book)
      .then((res) => {
        console.log(res);
        //should I redirect to saved page?
      })
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
    //clear out the search bar
    setFormObject({ ...formObject, search: "" });
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
              value={formObject.search}
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
          {books.map((book) => (
            <Card key={book.link}>
              <Card.Body>
                <Card.Title>
                  {book.title}
                  <Button
                    variant="danger"
                    className="float-right"
                    onClick={() => {
                      saveBook(book);
                    }}
                  >
                    Save
                  </Button>
                  <Button variant="danger" className="float-right mr-1">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={book.link}
                      style={{ color: "white" }}
                    >
                      View
                    </a>
                  </Button>
                </Card.Title>
                {book.subtitle ? (
                  <Card.Subtitle className="mb-3">
                    {book.subtitle}
                  </Card.Subtitle>
                ) : (
                  <br></br>
                )}
                <Card.Subtitle className="mb-3 text-muted">
                  Written by {book.authors}
                </Card.Subtitle>
                <Card.Img
                  style={{ width: "10%" }}
                  className="float-left mr-5"
                  src={book.image}
                />
                <Card.Text>{book.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
