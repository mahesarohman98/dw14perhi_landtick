import React, { Fragment, useState, useReducer } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updateOrder } from "../../js/_actions/orders";

const App = ({ login, myStatus, myId, updateOrder }) => {
  const [lgShow, setLgShow] = useState(false);
  const { data, loading, error } = login;

  const [value, setValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      status: myStatus
    }
  );

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setValue({ [name]: newValue });
  };

  const { status } = value;

  function handleSubmit(event) {
    event.preventDefault();
    updateOrder(myId, status);
    window.location.reload(false);
  }

  return (
    <Fragment>
      <Button variant="myPrimary" onClick={() => setLgShow(true)}>
        <label>Edit</label>
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
                <Modal.Title>Change status</Modal.Title>
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
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Status select</Form.Label>
                      <Form.Control
                        name="status"
                        as="select"
                        onChange={handleChange}
                      >
                        <option value="Cancel">Cancel</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                      </Form.Control>
                    </Form.Group>
                  </Form.Group>
                </Col>
                <Col className="text-center">
                  <Button variant="myPrimary" type="submit">
                    Submit
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
    updateOrder: (id, status) => dispatch(updateOrder(id, status))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
