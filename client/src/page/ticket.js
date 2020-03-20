import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import { Image } from "react-bootstrap";

import { getDuration } from "../js/middleware/dateTimeChanger";
import { getUser } from "../js/_actions/user";
import { getOrders } from "../js/_actions/orders";
import {
  updateIdentity,
  setIdentityId,
  getIdentity
} from "../js/_actions/identity";

import { useHistory } from "react-router-dom";

import Header from "../components/header";
import {
  Container,
  Row,
  Col,
  Tab,
  Table,
  Nav,
  Button,
  Form
} from "react-bootstrap";

const App = ({
  user,
  orders,
  getUser,
  getOrders,
  updateIdentity,
  myidentity,
  setIdentityId,
  getIdentity
}) => {
  let history = useHistory();

  useEffect(() => {
    if (awal === true) {
      getOrders();
      setValue({ awal: false });
    } else if (flag == false && orders.identity.length > 0) {
      const d = shareValue;
      const dasdf = [];
      identity.map((item, index) => {
        item.listId.map((itm, idx) => {
          dasdf.push({
            id: itm,
            noTdPengenal:
              item.listTandaPengenal == null
                ? " "
                : item.listTandaPengenal[idx],
            nama: item.listNama == null ? " " : item.listNama[idx],
            noHp: item.listNoHp == null ? " " : item.listNoHp[idx],
            email: item.listEmail == null ? " " : item.listEmail[idx]
          });
        });
      });
      setValue({
        shareValue: shareValue.concat(dasdf)
      });

      setValue({ flag: true });
    }
  });

  const [value, setValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      shareValue: [],
      flag: false,
      awal: true
    }
  );

  const { data, identity, loading, error } = orders;

  identity.map((item, index) => {});

  const { shareValue, flag, awal } = value;

  const handleShare = index => evt => {
    const name = evt.target.name;
    const newShare = shareValue.map((shareValue, sidx) => {
      if (index !== sidx) return shareValue;
      return { ...shareValue, [name]: evt.target.value };
    });
    setValue({ shareValue: newShare });
  };

  function handleSubmit(event, ticketKe) {
    event.preventDefault();
    let resdata = { id: [], tandaPengenal: [], nama: [], noHp: [], email: [] };
    ticketKe.map((ticketKe, ticketIdx) => {
      shareValue.map((shareValue, sidx) => {
        if (sidx === ticketKe) {
          resdata.id.push(shareValue.id);
          resdata.tandaPengenal.push(shareValue.noTdPengenal);
          resdata.nama.push(shareValue.nama);
          resdata.noHp.push(shareValue.noHp);
          resdata.email.push(shareValue.email);
        }
        return;
      });
    });
    // console.log(shareValue, "shareValue");
    updateIdentity(resdata);
  }

  function bayarSubmit(event, id) {
    event.preventDefault();
    setIdentityId(id);
    getIdentity(id);
    history.push("/invoice");
  }

  return (
    <>
      <Header />
      <Container fluid style={{ backgroundColor: "#f1f3f6" }}>
        <Row className="mt-4">
          <Col md={1}></Col>
          <Col md={10}>
            <h2>Ticket Saya</h2>
            <br />
            {identity.map((item, index) => {
              let identityID = [];
              return (
                <Row
                  id="divIn"
                  style={{ backgroundColor: "#f1f3f6", marginBottom: "60px" }}
                >
                  <Col
                    md={4}
                    style={{
                      marginLeft: "25px",
                      marginRight: "-25px"
                    }}
                  >
                    <h5>Landtick</h5>
                  </Col>
                  <Col md={8} className="text-right">
                    <h2>Kereta Api</h2>
                    <p style={{ color: "gray" }}>
                      {item.transaksi.ticket.dateStart}
                    </p>
                  </Col>
                  <Col
                    md={3}
                    style={{ marginLeft: "25px", marginRight: "-25px" }}
                  >
                    <h3>{item.transaksi.ticket.name}</h3>
                    <p>{item.transaksi.ticket.type.name}</p>
                  </Col>
                  <Col
                    md={3}
                    style={{ marginLeft: "25px", marginRight: "-25px" }}
                  >
                    <h5>
                      <Moment format="HH:mm">
                        {item.transaksi.ticket.startTime}
                      </Moment>
                    </h5>
                    <p>{item.transaksi.ticket.dateStart}</p>
                  </Col>
                  <Col
                    md={3}
                    style={{ marginLeft: "25px", marginRight: "-25px" }}
                  >
                    <h5>{item.transaksi.ticket.startStation}</h5>
                    <p>{item.transaksi.ticket.dateStart}</p>
                  </Col>
                  <Col md={3} />
                  <Col
                    md={3}
                    style={{ marginLeft: "25px", marginRight: "-25px" }}
                  >
                    {item.transaksi.status === "Pending" ? (
                      <>
                        <sub style={{ color: "yellow" }}>pending</sub>
                        <br />
                        <sub style={{ visibility: "hidden", color: "green" }}>
                          approved
                        </sub>
                      </>
                    ) : (
                      <>
                        <sub style={{ visibility: "hidden", color: "yellow" }}>
                          pending
                        </sub>
                        <br />
                        <sub style={{ color: "green" }}>approved</sub>
                      </>
                    )}
                  </Col>
                  <Col
                    md={3}
                    style={{ marginLeft: "25px", marginRight: "-25px" }}
                  >
                    <h5>
                      <Moment format="HH:mm">
                        {item.transaksi.ticket.arrivalTime}
                      </Moment>
                    </h5>
                    <p>{item.transaksi.ticket.dateStart}</p>
                  </Col>
                  <Col
                    md={3}
                    style={{ marginLeft: "25px", marginRight: "-25px" }}
                  >
                    <h5>{item.transaksi.ticket.destinationStation}</h5>
                    <p>{item.transaksi.ticket.dateStart}</p>
                  </Col>
                  <Col md={3}>
                    {item.transaksi.status === "Approved" ? (
                      <>
                        <h2>
                          <Image src="./qrcode.png" height="130px"></Image>
                        </h2>
                      </>
                    ) : (
                      ""
                    )}
                  </Col>

                  <Col md={10}>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>No. Tanda Pengenal</th>
                          <th>Nama Pemesan</th>
                          <th>No Hp Pemesan</th>
                          <th>Email Pemesan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.listId.map((dd, idx) => {
                          let realidx = 0;
                          if (index > 0) realidx = 1 + index + idx;
                          else realidx = idx;
                          identityID = identityID.concat(realidx);
                          return (
                            <>
                              {shareValue.map((shareValue, i) => {
                                if (i == realidx) {
                                  return (
                                    <tr key={item.id}>
                                      <td>
                                        <Form.Control
                                          type="text"
                                          name="noTdPengenal"
                                          value={shareValue.noTdPengenal}
                                          onChange={handleShare(realidx)}
                                        />
                                      </td>
                                      <td>
                                        <Form.Control
                                          type="text"
                                          name="nama"
                                          value={shareValue.nama}
                                          onChange={handleShare(realidx)}
                                        />
                                      </td>
                                      <td>
                                        <Form.Control
                                          type="text"
                                          name="noHp"
                                          value={shareValue.noHp}
                                          onChange={handleShare(realidx)}
                                        />
                                      </td>
                                      <td>
                                        <Form.Control
                                          type="text"
                                          name="email"
                                          value={shareValue.email}
                                          onChange={handleShare(realidx)}
                                        />
                                      </td>
                                    </tr>
                                  );
                                }
                              })}
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                  {console.log(item.transaksi.attachment)}
                  <Col md={2}>
                    {item.transaksi.status === "Pending" ? (
                      <>
                        <Button
                          variant="myPrimary"
                          onClick={e => handleSubmit(e, identityID)}
                        >
                          Set
                        </Button>
                        {item.transaksi.attachment !== null ? (
                          ""
                        ) : (
                          <>
                            <Button
                              variant="myPrimary"
                              onClick={e => bayarSubmit(e, item.transaksi.id)}
                            >
                              Bayar
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col md={1} />
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
    user: state.user,
    orders: state.orders,
    myidentity: state.identity
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(getUser()),
    getOrders: () => dispatch(getOrders()),
    updateIdentity: resdata => dispatch(updateIdentity(resdata)),
    setIdentityId: id => dispatch(setIdentityId(id)),
    getIdentity: id => dispatch(getIdentity(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
