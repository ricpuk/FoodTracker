import React from "react";

interface ProfilePictureProps {
  url: string;
}

const ProfilePicture = (props: ProfilePictureProps) => {
  const { url } = props;
  return (
    <img
      src={url ? url : require("../../assets/blank.png")}
      alt="Admin"
      className="rounded-circle"
      width="150"
    ></img>
  );
};

export default ProfilePicture;
