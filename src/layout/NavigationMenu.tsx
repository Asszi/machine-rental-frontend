import {Container, Nav, Navbar} from "react-bootstrap";

const NavigationMenu = () => {
    return (
      <Navbar bg="light" expand="lg">
          <Container>
              <Navbar.Brand href="#home">Machine Rental</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-nacbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                      <Nav.Link href="#link">Link</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    );
};

export default NavigationMenu;