import React, {FormEvent} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const submitHandler = async (event: FormEvent<any>) => {
  event.preventDefault();
  let formdata = new FormData(event.currentTarget);
  try {
    let value = Object.fromEntries(formdata.entries());
    console.info(value);
    let response = await fetch("/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    let resjson: Array<number> = await response.json();
    if (response.ok) {
      console.info(resjson);
      alert("Your ID is: " + resjson[0]);
    } else {
      console.error(resjson);
    }
  } catch (e) {
    console.error(e);
  }
};
const Register = () => {
  return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Container>
              <Row>
                <Col>
                  <h2>Create an Account</h2>
                </Col>
              </Row>
              <Row>
                <Col className="h5">
                  Already a user? <Link to={"/login"}>Login</Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form onSubmit={submitHandler}>
                    <Form.Row>
                      <Col>
                        <Form.Group controlId={"fname"}>
                          <Form.Control
                              name="fname"
                              type="text"
                              placeholder="First Name"
                              required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId={"lname"}>
                          <Form.Control
                              name="lname"
                              type="text"
                              placeholder="Last Name"
                          />
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col>
                        <Form.Group controlId={"address"}>
                          <Form.Control
                              type="text"
                              name="address"
                              placeholder="Address"
                          />
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    <Button type="submit" variant="dark">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </Container>
  );
};
export default Register;
