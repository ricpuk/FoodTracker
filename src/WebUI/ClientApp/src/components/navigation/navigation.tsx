import React, { useState, useEffect } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { LoginMenu } from "../api-authorization/LoginMenu";

const Navigation = () => {
  return (
    <Nav
      style={{
        position: "fixed",
        width: "100%",
        bottom: 10,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <NavItem>
        <NavLink href="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Another Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled href="#">
          Disabled Link
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Navigation;
