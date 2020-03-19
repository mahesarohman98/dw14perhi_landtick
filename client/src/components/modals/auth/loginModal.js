import React, { Fragment, useState, useReducer } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { postLogin } from "../../../js/_actions/auth";
import { updateOrder } from "../../../js/_actions/orders";

const App = ({ login, postLogin }) => {
  const [lgShow, setLgShow] = useState(false);
  const { data, loading, error } = login;
  const [value, setValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: ""
    }
  );

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setValue({ [name]: newValue });
  };

  const { email, password } = value;

  function handleSubmit(event) {
    event.preventDefault();
    postLogin({ email, password });
  }

  return (
    <Fragment>
      <Button variant="myPrimary" onClick={() => setLgShow(true)}>
        <label>Login</label>
      </Button>
      <Modal
        size="sm"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton id="myModal">
          <Container fluid>
            <Row>
              <Col xs={12} className="text-center">
                <Modal.Title>Login</Modal.Title>
              </Col>
            </Row>
          </Container>
        </Modal.Header>

        <Modal.Body id="myModal">
          {error === true ? <h6>Email or Password Wrong</h6> : <></>}
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
                      name="email"
                      value={email}
                      autoComplete="off"
                      placeholder="email"
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
                </Col>
                <Col className="text-center">
                  <Button variant="myPrimary" type="submit">
                    Login
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
function mapStateToProps(state) {
  return {
    login: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postLogin: value => dispatch(postLogin(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
