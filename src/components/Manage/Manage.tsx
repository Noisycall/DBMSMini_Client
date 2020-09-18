import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
let SureButton = ({
  sure,
  children,
}: {
  sure: () => void;
  children: (setter: any) => ReactNode;
}) => {
  let [surevisible, setSureVisible] = useState(false);

  if (surevisible) {
    return (
      <Button
        variant="warning"
        onBlur={() => setSureVisible(false)}
        onClick={(event) => {
          event.preventDefault();
          sure();
          setSureVisible(false);
        }}
      >
        Sure?
      </Button>
    );
  } else {
    return <>{children(setSureVisible)}</>;
  }
};
const Manage = () => {
  let [art, setArt] = useState([] as Array<any>);
  let { val } = useContext(AuthContext);
  let buyFunc = async (AID: number) => {
    if (val[0] === "user" && val[1]) {
      try {
        let body = { AID, CID: val[1] };
        let response = await fetch("/api/manage_art", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          let resjson = await response.json();
          alert("Order ID:" + resjson.OID);
        } else {
          throw await response.json();
        }
      } catch (e) {
        console.error(e);
      }
    } else alert("Not Logged in!");
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
  let tablehead = (
    <thead>
      <tr>
        <td>AID</td>
        <td>Name</td>
        <td>Artist</td>
        <td>Price</td>
        <td>Image</td>
        <td>Manage</td>
      </tr>
    </thead>
  );
  let tablerows = art.map((artwork) => {
    return (
      <tr>
        <td>{artwork.AID}</td>
        <td>{artwork.Name}</td>
        <td>{artwork.Artist}</td>
        <td>{artwork.Price}</td>
        <td>
          <img
            style={{ maxWidth: "20vw" }}
            src={artwork.data}
            alt={artwork.Name}
          />
        </td>
        <td>
          <Button href={`${artwork.AID}`}>Manage</Button>
        </td>
      </tr>
    );
  });
  return (
    <Container className="my-3" fluid>
      <Row className="mb-3">
        <Col>
          <Button href="add" variant="danger" block>
            Add Art
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table variant="dark" responsive="md" striped={true}>
            {tablehead}
            <tbody>{tablerows}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Manage;
