import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getIdentity } from "../js/_actions/identity";
import { uploadPayment } from "../js/_actions/orders";
import { useHistory } from "react-router-dom";

import {
  Col,
  Row,
  Container,
  Card,
  Table,
  Form,
  Button,
  Alert
} from "react-bootstrap";

import Header from "../components/header";

const App = ({ identity, getIdentity, uploadPayment }) => {
  const { data, id, loading, error } = identity;

  let history = useHistory();

  useEffect(() => {
    if (identity.id == null) history.push("/ticket");
  }, []);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const bayarSekarang = (id, file) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("payment", file);
    uploadPayment(formData);
    history.push("/ticket");
  };

  // if (error) return <h2>AN UNKNOWN ERROR OCCURED</h2>;

  // if (loading) return <>NOW LOADING</>;
  if (identity.data.listId != null) {
    return (
      <>
        <Header />
        <Container>
          <Row className="mt-4">
            <Col md={8}>
              <h1>
                <strong>Invoice</strong>
              </h1>
              <br />
              <Alert variant="myInfo">
                <p>
                  Silahkan melakukan pembayaran melalui M-Banking,E-Banking dan
                  ATM ke No.rek yang Tertera.}
                </p>
                <p>No.Rek : 393838493849384938</p>
              </Alert>

              <Table responsive>
                <tr>
                  <th>No.Tanda Pengenal</th>
                  <th>Nama Pemesanan</th>
                  <th>No.Handphone</th>
                  <th>Email</th>
                </tr>

                {data.listId.map((item, idx) => {
                  return (
                    <tr className="warnaabu">
                      <td>{item}</td>
                      <td>{data.listNama[idx]}</td>
                      <td>{data.listNoHp[idx]}</td>
                      <td>{data.listEmail[idx]}</td>
                    </tr>
                  );
                })}
              </Table>

              <Row style={{ marginTop: 60 }}>
                <Col sm={8}>
                  <h3>Rincian Harga</h3>
                  <Table bordered>
                    <tr>
                      <td>
                        {data.transaksi.ticket.name}{" "}
                        <span>x {data.transaksi.qty}</span>
                      </td>
                      <td>Rp. {data.transaksi.ticket.price}</td>
                    </tr>
                    <tr className="bgtotal">
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>
                        <strong>Rp. {data.transaksi.totalPrice}</strong>
                      </td>
                    </tr>
                  </Table>
                  <Button
                    variant="myPrimFill"
                    className="mb-5 mt-3"
                    onClick={() => bayarSekarang(id, file)}
                  >
                    Bayar Sekarang
                  </Button>
                </Col>
                <Col>
                  <Form enctype="multipart/form-data">
                    <Form.Group controlId="formUploadFile">
                      <Form.Control
                        style={{ display: "none" }}
                        accept="image/*"
                        multiple
                        type="file"
                        name="payment"
                        onChange={e => {
                          setFile(e.target.files[0]);
                          setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                      <Button variant="myPrimary">
                        <Form.Label>Upload</Form.Label>
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Col>

            <Col md={4}>
              <div>
                <Row id="divIn">
                  <Col md={8} style={{ backgroundColor: "#d6d7d8" }}>
                    <h2>
                      <strong>Kereta Api</strong>
                    </h2>
                    <p>{data.transaksi.ticket.dateStart}</p>
                  </Col>
                  <Col
                    md={4}
                    className="text-right"
                    style={{ backgroundColor: "#d6d7d8" }}
                  >
                    <img style={{ width: 130 }} src={Image.jpg} alt="img"></img>
                    <br />
                    <sub style={{ color: "black" }}>TU48477</sub>
                  </Col>

                  <Col>
                    <h5>{data.transaksi.ticket.name}</h5>
                    {/* <span>Eksekutif (H)</span> */}
                    <Table>
                      <h5 style={{ color: "red" }}></h5>
                      <tr>
                        <th>{data.transaksi.ticket.startTime}</th>
                        <th>{data.transaksi.ticket.startStation}</th>
                      </tr>
                      <tr>
                        <td>{data.transaksi.ticket.dateStart}</td>
                        <td></td>
                      </tr>
                      <h5 style={{ color: "red" }}></h5>
                      <tr>
                        <th>{data.transaksi.ticket.arrivalTime}</th>
                        <th>{data.transaksi.ticket.destinationStation}</th>
                      </tr>
                      <tr>
                        <td>{data.transaksi.ticket.dateStart}</td>
                        <td></td>
                      </tr>
                    </Table>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col style={{ marginTop: "42px" }} className="text-center">
              @mahesa rohman
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return "loading";
  }
};

function mapStateToProps(state) {
  return {
    identity: state.identity
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getIdentity: id => dispatch(getIdentity(id)),
    uploadPayment: formData => dispatch(uploadPayment(formData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
