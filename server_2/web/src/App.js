import React from "react";

/**
 * Bootstrap
 */
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

/**
 * Components
 */
import Stats from "./components/Stats";
import Publications from "./components/Publications";

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>System Info</Navbar.Brand>
      </Navbar>
      <Container className="mt-4">
        <Stats />
        <Publications />
      </Container>
    </div>
  );
}

export default App;
