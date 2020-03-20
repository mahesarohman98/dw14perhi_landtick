import React, { useEffect } from "react";
import { connect } from "react-redux";

import Register from "../components/modals/auth/registerModal";
import Login from "../components/modals/auth/loginModal";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  NavDropdown
} from "react-bootstrap";
function App({ user, auth }) {
  const navStyle = {
    backgroundColor: "red",
    boxShadow:
      "inset 0 0 15px rgba(55, 84, 170, 0)," +
      "inset 0 0 20px rgba(255, 255, 255, 0), 7px 7px 15px rgba(55, 84, 170, 0.15)," +
      "-7px -7px 20px rgba(255, 255, 255, 1)," +
      "inset 0px 0px 4px rgba(255, 255, 255, 0.2);"
  };
  return (
    <>
      <Navbar expand="lg" sticky="top" id="myNav">
        <Navbar.Brand href="/">LandTick</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Form inline>
            {user.data.id != null ? (
              <div>
                <NavDropdown id="basic-nav-dropdown" title={user.data.name}>
                  <NavDropdown.Item href="/ticket">
                    Ticket Saya
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <>
                <div style={{ marginLeft: "15px" }}>
                  <Register />
                </div>
                <div style={{ marginLeft: "15px" }}>
                  <Login />
                </div>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}

export default connect(mapStateToProps)(App);
