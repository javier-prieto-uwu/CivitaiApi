import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Navbar2 = () => {
  return (
<>

    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">CivitaIA</Navbar.Brand>
      <Nav className="me-auto">
      <Link to="/">Home</Link> 
      br
      <Link to="/Imagenes">Imagenes</Link>
      br
      <Link to="/Creadores">Creadores</Link>
      br
      </Nav>
    </Container>
  </Navbar>

</>

  )
}

export default Navbar2