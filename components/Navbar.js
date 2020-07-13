import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark"  expand="lg">
      <Navbar.Brand href="#home">Covid19</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Map</Nav.Link>
          <Nav.Link href="#link">About</Nav.Link>
         
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="info">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
