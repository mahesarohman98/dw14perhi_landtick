import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

import LoginForm from "../forms/auth/loginform.js";
import RegisterForm from "../forms/auth/registerform";

import { useHistory } from "react-router-dom";

function LoginModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  let history = useHistory();

  useEffect(() => {
    localStorage.setItem("isLogin", false);
  });

  const closeButton = {
    color: "#fd2d2d",
    fontSize: "45px",
    padding: "3px, 6px, 3px, 6px",
    cursor: "pointer"
  };

  const header = {
    display: "block",
    // alignItems: 'none'
    borderBottom: "0px"
  };

  return (
    <>
      <Button
        variant="myPrimary"
        className="justify-content-end"
        onClick={() => setModalShow(true)}
      >
        Login
      </Button>

      <Modal
        {...props}
        size="g"
        show={modalShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={header}>
          <Row>
            <Col xs={12} className="text-right">
              <AiOutlineClose
                className="btn btn-myLight"
                style={closeButton}
                onClick={() => setModalShow(false)}
              />
            </Col>
            <Col xs={12} className="text-center" style={{ fontSize: "40px" }}>
              {props.name}
            </Col>
          </Row>
        </Modal.Header>

        <Modal.Body style={{ background: "rgba(#929cd0, 0.8)" }}>
          <Row>
            <Col>
              {props.name == "Login" ? <LoginForm /> : <RegisterForm />}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
