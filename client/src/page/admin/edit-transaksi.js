import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { getAllOrders, deleteOrder } from "../../js/_actions/orders";
import EditModal from "../../components/modals/edit-status";
import CreateTicketModal from "../../components/modals/create-ticket";

import Header from "../../components/header";

import { useHistory } from "react-router-dom";
const App = ({ getAllOrders, deleteOrder, user, orders }) => {
  useEffect(() => {
    getAllOrders();
  }, []);
  let history = useHistory();
  const { data } = orders;

  function handleDelete(id) {
    deleteOrder(id);
    // window.location.reload(false);
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <h2>Transaksi</h2>
              </Col>
              <Col className="text-right"></Col>
            </Row>
            <br />

            <Table responsive>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Tiket</th>
                  <th>Bukti Transfer</th>
                  <th>Status Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {data.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.customer.name}</td>
                        <td>{item.ticket.name}</td>
                        <td>{item.attachment}</td>
                        <td>{item.status}</td>
                        <td>
                          <EditModal myStatus={item.status} myId={item.id} />
                          <Button
                            style={{ marginLeft: "15px" }}
                            variant="myDanger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    orders: state.orders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllOrders: () => dispatch(getAllOrders()),
    deleteOrder: id => dispatch(deleteOrder(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
