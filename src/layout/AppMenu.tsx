import { Container, Nav, Navbar } from 'react-bootstrap';

const AppMenu = () => {
    return (
      <Navbar bg='light' expand='lg'>
          <Container>
              <Navbar.Brand href='#home'>Machine Rental</Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-nacbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='me-auto'>
                      <Nav.Link href='/'>Home</Nav.Link>
                      <Nav.Link href='/company'>Company</Nav.Link>
                      <Nav.Link href='/machine'>Machine</Nav.Link>
                      <Nav.Link href='/rental'>Rental</Nav.Link>
                      <Nav.Link href='/transaction'>Transaction</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    );
};

export default AppMenu;
