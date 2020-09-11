import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContextProvider/AuthContextProvider";

let SLink = ({ children, ...rest }: any) => {
  return (
    <Link style={{ textDecoration: "none", color: "inherit" }} {...rest}>
      {children}
    </Link>
  );
};
const NavBar = () => {
  let { val } = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <SLink to={"/home"}>Home</SLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            style={{ display: val[0] === "curator" ? "" : "none" }}
            as="div"
          >
            <SLink to={"/manage"}>Manage</SLink>
          </Nav.Link>
          <Nav.Link as="div">
            <SLink to={"/gallery"}>Gallery</SLink>
          </Nav.Link>

          <Nav.Link>
            <SLink to={"/shop"}>Shop</SLink>
          </Nav.Link>
          <Nav.Link as="div">
            <SLink to={"/login"}>Login</SLink>
          </Nav.Link>
          <Nav.Link
            as="div"
            onClick={() => {
              sessionStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
