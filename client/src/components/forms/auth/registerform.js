import React from "react";
import { Form, Button } from "react-bootstrap";
import { AiFillCamera } from "react-icons/ai";

function RegisterForm() {
  return (
    <Form>
      <div className="text- ">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Full Name" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select">
            <option value="" selected disable>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Gender">Gender</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formPhoneBreeder">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder="Phone" />
        </Form.Group>
        <Form.Group controlId="formAddressBreeder">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="Address" />
        </Form.Group>
      </div>
      <div className="text-center">
        <Button variant="myPrimary">Submit</Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
