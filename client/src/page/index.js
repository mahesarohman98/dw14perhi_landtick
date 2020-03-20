import React, { useEffect } from "react";
import { connect } from "react-redux";
import { postOrder } from "../js/_actions/orders";
import Moment from "react-moment";
import moment from "moment";
import { useHistory } from "react-router-dom";

import Banner from "../components/banner";
import Header from "../components/header";
import BuyTix from "../components/buytix";
import { getDuration } from "../js/middleware/dateTimeChanger";
import { Container, Row, Col, Tab, Table, Nav } from "react-bootstrap";

const App = ({ tickets, postOrder, orders }) => {
  const { data, loading, error } = tickets;
  let history = useHistory();

  useEffect(() => {}, []);

  if (orders.loading == "true") {
    alert("sdf");
  }

  const handlerClick = item => {
    let data = {
      trainId: item.id,
      quantity: tickets.quantity
    };
    postOrder(data);
    alert("Berhasil memesan ", tickets.quantity, "bangku");
  };

  return (
    <>
      <Header />
      <Banner />
      <Container fluid style={{ backgroundColor: "#f1f3f6" }}>
        <Row style={{ marginTop: "-40px" }}>
          <Col md={1} />
          <Col md={10} style={{ marginBottom: "48px" }}>
            <Tab.Container defaultActiveKey="first">
              <BuyTix />
            </Tab.Container>
          </Col>
          <Col md={1} />
          <Col md={1} />
          {data.length > 0 ? (
            <Col md={10}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nama Kereta</th>
                    <th>Berangkat</th>
                    <th>Tiba</th>
                    <th>Durasi</th>
                    <th>Harga Per Orang</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => handlerClick(item)}
                      >
                        <td>
                          <h5>{item.name}</h5>
                          <h6>{item.type.name}</h6>
                        </td>
                        <td>
                          <h5>
                            <Moment format="HH:mm">{item.startTime}</Moment>
                          </h5>
                          <h6>{item.startStation}</h6>
                        </td>
                        <td>
                          <h5>
                            <Moment format="HH:mm">{item.arrivalTime}</Moment>
                          </h5>
                          <h6>{item.destinationStation}</h6>
                        </td>
                        <td>
                          <h5>
                            {getDuration(item.startTime, item.arrivalTime)}
                          </h5>
                        </td>
                        <td>
                          <h5>Rp. {item.price}</h5>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          ) : (
            ""
          )}

          <Col md={1} />
        </Row>
        <Row>
          <Col style={{ marginTop: "42px" }} className="text-center">
            @mahesa rohman
          </Col>
        </Row>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    tickets: state.tickets,
    orders: state.orders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postOrder: data => dispatch(postOrder(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
