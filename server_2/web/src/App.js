import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">System Info</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#usage">Usage</Nav.Link>
          <Nav.Link href="#data">Data</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="mt-5">
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>

        </Row>
      </Container>
    </div>
  );
}

export default App;
