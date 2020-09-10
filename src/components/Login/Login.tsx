import React, {useContext, useState} from "react";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import "./login.css";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../AuthContextProvider/AuthContextProvider";

const Login = () => {
  let [userlog, setUser] = useState(0);
  let [curatorlog, setCurator] = useState(0);
  let {val, toggleAuth} = useContext(AuthContext);
  let hist = useHistory();
  return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Container
                className="align-content-around"
                style={{height: "80vh"}}
            >
              <Row style={{height: "inherit"}}>
                <Col className="d-flex flex-column justify-content-center align-items-center">
                  <h2 className="my-5">Login Here</h2>
                  <InputGroup className="w-50 my-3">
                    <Form.Control
                        type="number"
                        min={1}
                        onChange={(event: any) => {
                          setUser(event.target.value);
                        }}
                    />
                    <InputGroup.Append>
                      <Button
                          variant={"dark"}
                          onClick={() => {
                            toggleAuth(["user", userlog]);
                            hist.push("/home");
                          }}
                      >
                        User
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <InputGroup className="w-50 my-3">
                    <Form.Control
                        type="number"
                        min={1}
                        onChange={(event: any) => {
                          setCurator(event.target.value);
                        }}
                    />
                    <InputGroup.Append>
                      <Button
                          variant={"dark"}
                          onClick={() => {
                            toggleAuth(["curator", curatorlog]);
                            sessionStorage.setItem("type", "curator");
                            hist.push("/home");
                          }}
                      >
                        Curator
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <Button
                      className="my-3 w-50"
                      variant={"dark"}
                      onClick={() => {
                        hist.push("/register");
                      }}
                  >
                    Register User
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>

          <span
              style={{
                width: "0px",
                border: "3px",
                borderColor: "black",
                borderStyle: "solid",
                borderRadius: "3px",
                marginTop: "10px",
                marginBottom: "10px",
                display: window.innerWidth < 800 ? "none" : "",
              }}
          />

          <Col
              className="d-lg-flex flex-column justify-content-center"
              style={{
                height: "80vh",
                display: window.innerWidth < 800 ? "none" : "",
              }}
          >
            <h1 className="font-weight-bold">Art Gallery</h1>
          </Col>
        </Row>
      </Container>
  );
};
export default Login;
