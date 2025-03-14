import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function NavigationBar() {
    return (
        <Navbar expand="lg" id='navbar' fixed='top' bg='dark' data-bs-theme="dark">
          <Container className='container'>
            <Navbar.Brand href="/home" className='imgContainer'>
              <img src='src\assets\ticket.png' className='brandImg'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/addTicket">Add Ticket</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default NavigationBar