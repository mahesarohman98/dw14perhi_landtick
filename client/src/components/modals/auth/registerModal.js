import React, { Fragment, useState, useReducer } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { postRegister } from "../../../js/_actions/auth";

const App = ({ register, postRegister }) => {
  const [rgShow, setRgShow] = useState(false);
  const { data, loading, error } = register;
  const [value, setValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      password: "",
      gender: "",
      address: "",
      phone: ""
    }
  );

  const handleChange = evt => {
    const nameId = evt.target.name;
    const newValue = evt.target.value;
    setValue({ [nameId]: newValue });
  };

  const { name, email, password, gender, address, phone } = value;

  function handleSubmit(event) {
    event.preventDefault();
    postRegister({ name, email, password, gender, address, phone });
  }

  return (
    <Fragment>
      <Button variant="myPrimary" onClick={() => setRgShow(true)}>
        <label>Daftar</label>
      </Button>
      <Modal
        size="sm"
        show={rgShow}
        onHide={() => setRgShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        // style={{ backgroundColor: "#f1f3f6" }}
      >
        <Modal.Header closeButton id="myModal">
          <Container fluid>
            <Row>
              <Col xs={12} className="text-center">
                <Modal.Title>Register</Modal.Title>
              </Col>
            </Row>
          </Container>
        </Modal.Header>

        <Modal.Body id="myModal">
          {error === true ? <h6>Email Already Taken</h6> : <></>}
          {loading === true ? <h6>Now Loading</h6> : <></>}
          {data.token != null ? <>{window.location.replace("/")}</> : <></>}
          <Form onSubmit={handleSubmit}>
            <Container fluid>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="name"
                      value={name}
                      autoComplete="off"
                      placeholder="Your Name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      onChange={handleChange}
                      name="email"
                      value={email}
                      autoComplete="off"
                      placeholder="youremail@mail.com"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      onChange={handleChange}
                      name="password"
                      value={password}
                      autoComplete="off"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      as="select"
                      name="gender"
                      onChange={handleChange}
                    >
                      <option value="" selected disable>
                        Select Your Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="phone"
                      value={phone}
                      autoComplete="off"
                      placeholder="Phone Number"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="address"
                      value={address}
                      autoComplete="off"
                      placeholder="Address"
                      rows="3"
                    />
                  </Form.Group>
                </Col>
                <Col className="text-center">
                  <Button variant="myPrimary" type="submit">
                    Register
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

//export default App;
function mapStateToProps(state) {
  return {
    register: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postRegister: value => dispatch(postRegister(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
