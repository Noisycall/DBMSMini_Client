import React, { FormEvent, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const AddArt = () => {
  let [artwork, setArtwork] = useState("");
  const submitHandler = async (evt: FormEvent<any>) => {
    evt.preventDefault();
    const formdata = new FormData(evt.currentTarget);
    const body = Object.fromEntries(formdata.entries());
    body.data = artwork;
    try {
      let resp = await fetch("/api/add_art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (resp.ok) {
        alert("Success!");
      } else throw await resp.json();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2>Manage Art</h2>
          <Form
            onSubmit={submitHandler}
            id="manageform"
            className="d-flex flex-column justify-content-between "
          >
            <Form.Group>
              <Form.Control type="text" placeholder="Name" name="Name" />
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Artist" name="Artist" />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                min={0}
                placeholder="Price"
                name="Price"
              />
            </Form.Group>
            <Button type="submit">Upload</Button>
          </Form>
        </Col>
        <Col>
          <h2>Preview</h2>
          <Form.File
            multiple={false}
            id="art_file"
            name="art_file"
            label="Choose artwork file"
            accept="image/png, image/jpeg"
            onChange={(event: any) => {
              let path = event.target.files[0];
              console.info(path);
              let reader = new FileReader();
              reader.readAsDataURL(path);
              reader.onload = () => {
                setArtwork(reader.result as string);
              };
            }}
            custom
          />
          <br />
          <br />
          <div
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              minHeight: "100px",
              minWidth: "100%",
              background: "black",
            }}
          >
            {artwork ? (
              <img
                style={{ maxHeight: "inherit", maxWidth: "inherit" }}
                src={artwork}
              />
            ) : (
              <div
                style={{ minHeight: "100px", color: "white" }}
                className="d-flex flex-column justify-content-center"
              >
                <h4>Preview</h4>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default AddArt;
