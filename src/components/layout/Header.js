import {Nav, Container, Navbar, Button} from "react-bootstrap";
import { NavLink, useNavigate} from "react-router-dom";


const Header = () => {
  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>

          <Nav className="me-auto">
            <Nav.Link>
              <NavLink  variant="light" className="fw-bold text-white" style={{textDecoration: 'none'}}>Home</NavLink>
            </Nav.Link>
          </Nav>
          <Nav>
           <Button
              variant="light"
              style={{ fontWeight: "bold" }}
            >{`Cart  ${0}`}</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
