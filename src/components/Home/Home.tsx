import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Home = () => {
  const hist = useHistory();
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-3 text-center">Home</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={12}>
          <img src="https://via.placeholder.com/150" alt="placeholder" />
          <br />
          <br />
          <p className="font-weight-bold text-center text-center">
            Browse our gallery
          </p>
          <p className="font-weight-light text-center">
            Browse high quality artwork from some of the best artists
          </p>
          <Button
            variant="dark"
            onClick={() => {
              hist.push("/gallery");
            }}
          >
            Browse
          </Button>
        </Col>
        <Col lg={6} md={12}>
          <img src="https://via.placeholder.com/150" alt="placeholder" />
          <br />
          <br />
          <p className="font-weight-bold text-center">
            Shop for your favourite art
          </p>
          <p className="font-weight-light">
            Shop for high quality prints in multiple sizes
          </p>
          <Button
            variant="dark"
            onClick={() => {
              hist.push("/shop");
            }}
          >
            Purchase Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
