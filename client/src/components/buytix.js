import React, { useEffect, useState, useReducer } from "react";
import { connect } from "react-redux";
import { getTicket, findTickets, updateQuantity } from "../js/_actions/tickets";

import { Table, Button, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import { IoIosSwap } from "react-icons/io";
import moment from "moment";

function App({ updateQuantity, findTickets, getTicket, tickets }) {
  let dateNow = moment().format("YYYY-MM-DD");
  const [value, setValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      startStation: "",
      destinationStation: "",
      dateStart: dateNow,
      quantity: 1
    }
  );
  const { startStation, destinationStation, dateStart, quantity } = value;

  useEffect(() => {
    // getTicket();
  }, []);

  const buyTix = {
    backgroundColor: "#f58021",
    boxShadow:
      "inset 0 0 15px rgba(55, 84, 170, 0)," +
      "inset 0 0 20px rgba(255, 255, 255, 0), 7px 7px 15px rgba(55, 84, 170, 0.15)," +
      "-7px -7px 20px rgba(255, 255, 255, 1)," +
      "inset 0px 0px 4px rgba(255, 255, 255, 0.2);"
  };

  const handleChange = evt => {
    const nameId = evt.target.name;
    const newValue = evt.target.value;
    setValue({ [nameId]: newValue });
  };

  function handleSubmit(event) {
    event.preventDefault();
    findTickets({ startStation, destinationStation, dateStart, quantity });
    updateQuantity({ quantity });
    console.log(tickets.data, "===========================0s");
  }

  return (
    <div id="buyTix">
      <Row>
        <Col md={2} xs={12}>
          <Nav>
            <Nav.Item>
              <Nav.Link
                eventKey="first"
                style={{
                  borderBottom: "3px solid gray",
                  color: "black"
                }}
              >
                <label>Tiket Kereta</label>
              </Nav.Link>
              <Nav.Link
                eventKey="second"
                style={{
                  borderBottom: "3px solid #e9ecef",
                  color: "black"
                }}
              >
                <label>Tiket Pesawat</label>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10} xs={12}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <h5>Tiket Kereta Api</h5>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={5} xs={12}>
                    <Table>
                      <tbody>
                        <tr>
                          <td colSpan="2">
                            <Form.Label>Asal</Form.Label>
                            <Form.Control
                              name="startStation"
                              as="select"
                              onChange={handleChange}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Form.Control>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label>Tanggal berangkat</Form.Label>
                            <Form.Control
                              type="date"
                              name="dateStart"
                              value={dateStart}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <Form.Check type="checkbox" label="Pulang Pergi" />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col
                    md={1}
                    xs={12}
                    style={{ top: "45px", paddingLeft: "20px" }}
                  >
                    <Button variant="myPrimary">
                      <div style={{ fontSized: "2rem" }}>
                        <IoIosSwap />
                      </div>
                    </Button>
                  </Col>
                  {/* style={{ top: "45px" }} tambah dibawah jika xs */}
                  <Col md={5} xs={12}>
                    <Table>
                      <tbody>
                        <tr>
                          <td colSpan="3">
                            <Form.Label>Tujuan</Form.Label>
                            <Form.Control
                              as="select"
                              name="destinationStation"
                              value={destinationStation}
                              onChange={handleChange}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Form.Control>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label>Dewasa</Form.Label>
                            <Form.Control
                              type="number"
                              name="quantity"
                              onChange={handleChange}
                              value={quantity}
                            />
                          </td>
                          <td>
                            <Form.Label>Bayi</Form.Label>
                            <Form.Control type="number" name="cnt-bby" />
                          </td>
                          <td>
                            <Button variant="myPrimary" type="submit">
                              Set
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <h5>Tiket Pesawat</h5>
              <hr />
              <h5>Fitur masih belum tersedia</h5>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    tickets: state.tickets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    findTickets: value => dispatch(findTickets(value)),
    updateQuantity: value => dispatch(updateQuantity(value)),
    getTicket: () => dispatch(getTicket())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
