import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Button, NavLink } from "reactstrap";

type PathParamsType = {
  clientId: string;
};

type LinkButtonProps = RouteComponentProps<PathParamsType> & {
  to: string;
  color: string;
  className: string;
  text: string;
};

const LinkButton = (props: LinkButtonProps) => {
  const { history, to, color, className, text } = props;
  return (
    <NavLink
      tag={Button}
      color={color}
      className={className}
      onClick={() => {
        history.push(window.location.pathname + "/" + to);
      }}
    >
      {text}
    </NavLink>
  );
};

export default withRouter(LinkButton);
