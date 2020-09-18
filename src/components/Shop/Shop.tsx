import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import Bill from "./Bill";
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
const Shop = () => {
  let [art, setArt] = useState([] as Array<any>);
  let [bill, setBill] = useState({} as any);
  let [show, setShow] = useState(false);
  let { val } = useContext(AuthContext);
  let buyFunc = async (AID: number) => {
    if (val[0] === "user" && val[1]) {
      try {
        let body = { AID, CID: val[1] };
        let response = await fetch("/api/buy_art", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          let resjson = await response.json();
          delete resjson[0].data;
          setBill(resjson[0]);
          setShow(true);
          console.info(resjson);
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
        <td>Buy</td>
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
          <SureButton
            sure={() => {
              buyFunc(artwork.AID).catch((err) => {
                console.error(err);
              });
            }}
          >
            {(setSure) => (
              <Button onClick={() => setSure(true)} variant="light">
                Buy
              </Button>
            )}
          </SureButton>
        </td>
      </tr>
    );
  });
  return (
    <>
      <Table variant="dark" responsive="md" striped={true}>
        {tablehead}
        <tbody>{tablerows}</tbody>
      </Table>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Bill {...bill} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Shop;
