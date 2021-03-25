import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import { Col, Row, Container } from "../components/Grid";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Books() {
  // Setting our component's initial state
  //TODO  change it to global state using context {books, saved books}
  const [books, setBooks] = useState([]);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all saved books and sets them to books
  function loadBooks() {
    API.getSavedBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Jumbotron>
        <h1>(React) Google Books Search</h1>
        <h3>Search for and Save Books of Internet</h3>
      </Jumbotron>
      <Row>
        <Col size="md-12">
          <h3>Saved books</h3>
          <br></br>
          {books.map((book) => (
            <Card key={book._id}>
              <Card.Body>
                <Card.Title>
                  {book.title}
                  <Button
                    variant="danger"
                    className="float-right"
                    onClick={() => {
                      deleteBook(book._id);
                    }}
                  >
                    delete
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
