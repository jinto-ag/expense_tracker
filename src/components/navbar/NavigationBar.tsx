import {
  Container,
  Image,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../context/AuthContext";
import { useMessage } from "../../context/MessageContext";
import { Context } from "../types";
import { useState } from "react";

const NavigationBar = () => {
  const [show, setShow] = useState(false);
  const { currentUser, signOut } = useAuth();
  const { addMessage } = useMessage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      addMessage({
        text: "Signed Out successfully!",
        type: Context.SUCCESS,
        autoClose: true,
        timeout: 3000,
      });
      navigate("/signin");
    } catch (error) {
      addMessage({
        text: `Signout faild! ${error}`,
        type: Context.DANGER,
        autoClose: false,
      });
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="shadow-none border-0"
          onClick={handleShow}
        />
        <Navbar.Offcanvas
          id="navbar-nav-offcanvas"
          placement="end"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="navbar-nav-offcanvas">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav
              className="justify-content-end flex-grow-1 pe-3"
              onSelect={handleClose}
            >
              <Nav.Link href="#action1">Profile</Nav.Link>
              <Nav.Link href="#action2">Recent Activities</Nav.Link>
              <NavDropdown title="Expenses" id="basic-nav-dropdown" onSelect={handleClose}>
                <NavDropdown.Item as={Link} to="/expenses/new">
                  Create
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/expenses">
                  List
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link>{currentUser?.email}</Nav.Link>
              <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
