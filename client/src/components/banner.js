import React from "react";
import {
  Image,
  Jumbotron,
  Carousel,
  Row,
  Col,
  Container
} from "react-bootstrap";
function App() {
  return (
    <Jumbotron id="myTron">
      <Container>
        <Row>
          <Col />
          <Col md={5} style={{ marginTop: "40px" }}>
            <h3>Selamat Pagi, Ticket Seekers</h3>
            <h4>Ingin Pulkam dengan Good Deal?</h4>
            <h5>Masuk dan Daftar Sekarang !!</h5>
          </Col>
          <Col md={5}>
            <Carousel
              id="divOut"
              style={{ marginRight: "90px" }}
              className="text-center"
            >
              <Carousel.Item>
                <Image src="/promo.jpg" rounded height="100%" width="100%" />
              </Carousel.Item>
              <Carousel.Item>
                <Image src="/promo.jpg" rounded height="100%" width="100%" />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={1} />
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default App;
