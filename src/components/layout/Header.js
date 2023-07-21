import { useContext } from "react";
import {Nav, Container, Navbar, Button} from "react-bootstrap";
import { NavLink} from "react-router-dom";
import CartContext from "../../store/cart-context";


const Header = () => {
  const cartCtx = useContext(CartContext);
  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>

          <Nav className="me-auto">
            <Nav.Link>
              <NavLink  variant="light" className="fw-bold text-white" style={{textDecoration: 'none'}} to='/'>Home</NavLink>
            </Nav.Link>
          </Nav>
          <Nav>
            <NavLink to='cart'> 
            <Button
              variant="light"
              style={{ fontWeight: "bold" }}
            >{`Cart ${cartCtx._currentValue.cartItems.length}`}</Button>
            </NavLink>
          
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
