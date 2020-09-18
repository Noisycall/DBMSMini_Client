import React from "react";
import { Card, ListGroup } from "react-bootstrap";
interface BillProps {
  Artist: string;
  Price: number;
  OID: number;
  AID: number;
  CID: number;
  Name: string;
}
const Bill = (props: BillProps) => {
  return (
    <ListGroup>
      {Object.entries(props).map((elem) => {
        return (
          <ListGroup.Item
            variant="info"
            key={elem[0]}
          >{`${elem[0]}: ${elem[1]}`}</ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Bill;
