import React, { useEffect, useState } from "react";
import {
  Carousel,
  Col,
  Container,
  Row,
} from "react-bootstrap";

const Gallery = () => {
  let [art, setArt] = useState([] as Array<any>);
  let featured = () => {
    if (art.length) {
      let index = (art.length * Math.random()) | 0;
      return (
        <img
          style={{
            maxWidth: "75vw",
            objectFit: "scale-down",
            marginBottom: "3px",
          }}
          src={art[index].data}
          alt={art[index].name}
        />
      );
    } else return "";
  };
  useEffect(() => {
    const getter = async () => {
      try {
        let response = await fetch("/api/all_art");
        if (response.ok) {
          setArt(await response.json());
        } else throw await response.json();
      } catch (e) {
        console.error(e);
      }
    };
    getter();
  }, []);
  return (
    <Container className="my-3">
      <Row>
        <Col>
          <h1>Gallery</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Featured Art</h3>
        </Col>
      </Row>
      <Row>
        <Col>{featured()}</Col>
        <Col>{featured()}</Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Carousel>
            {art.map((artwork) => {
              return (
                <Carousel.Item>
                  <img
                    style={{ maxWidth: "75vw", marginBottom: "3px" }}
                    src={artwork.data}
                    alt={artwork.Name}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};
export default Gallery;
