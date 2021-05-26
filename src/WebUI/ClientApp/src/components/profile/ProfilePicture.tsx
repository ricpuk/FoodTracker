import React from "react";
import Image from "../image/Image";

interface ProfilePictureProps {
  url: string;
}

const ProfilePicture = (props: ProfilePictureProps) => {
  const { url } = props;
  return (
    <Image
      source={url ? url : require("../../assets/blank.png")}
      alt="User"
      style={{ width: 150 }}
      classes="rounded-circle"
    />
  );
};

export default ProfilePicture;
