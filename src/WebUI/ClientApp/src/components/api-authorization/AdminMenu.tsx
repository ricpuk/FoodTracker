import React, { Fragment, useEffect, useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";

export const AdminMenu = () => {
  const isAdmin = useSelector((state: ApplicationState) => {
    if (!state.user || !state.user.profile) {
      return false;
    }
    return state.user.profile.role == "Administrator";
  });

  if (!isAdmin) {
    return null;
  }
  return (
    <Fragment>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Admin
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <NavLink tag={Link} className="text-dark" to="/admin/products">
              Products (Admin)
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink tag={Link} className="text-dark" to="/admin/reports">
              Product reports (Admin)
            </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  );
};
