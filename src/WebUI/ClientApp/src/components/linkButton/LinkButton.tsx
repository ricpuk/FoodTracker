import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Button, NavLink } from "reactstrap";

type LinkButtonProps = RouteComponentProps & {
  to: string;
  color: string;
  className: string;
  text: string;
  onClick?: () => void;
};

const LinkButton = (props: LinkButtonProps) => {
  const { history, to, color, className, text, onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    history.push(window.location.pathname + "/" + to);
  };
  return (
    <NavLink
      tag={Button}
      color={color}
      className={className}
      onClick={handleClick}
    >
      {text}
    </NavLink>
  );
};

export default withRouter(LinkButton);
