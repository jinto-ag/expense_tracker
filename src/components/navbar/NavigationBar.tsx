import React, { useRef, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import logo from "../../assets/logo.svg";

const NavigationBar = () => {
  const { currentUser, signOut } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      ref={navbarRef}
      expanded={expanded}
      onToggle={() => setExpanded((prevExpanded: any) => !prevExpanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={styles.navbarCollapse}
        >
          <Nav className="me-auto">
            {currentUser ? (
              <>
                <NavDropdown title="Expenses" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/expenses/new">
                    Create
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/expenses">
                    List
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link>{currentUser.email}</Nav.Link>
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin">
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
