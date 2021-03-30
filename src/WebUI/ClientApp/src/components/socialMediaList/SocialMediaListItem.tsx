import React from "react";
import { IconType } from "react-icons";
import { ListGroupItem } from "reactstrap";

interface SocialMediaListItemProps {
  icon: React.ReactNode;
  heading: string;
  url: string;
}

const SocialMediaListItem = (props: SocialMediaListItemProps) => {
  const { icon, heading, url } = props;

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
      <h6 className="mb-0">
        {icon}
        {heading}
      </h6>
      <span className="text-secondary">{url ? url : "-"}</span>
    </ListGroupItem>
  );
};

export default SocialMediaListItem;
