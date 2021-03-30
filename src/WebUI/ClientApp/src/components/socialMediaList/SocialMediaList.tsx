import React from "react";
import {
  FiGlobe,
  FiYoutube,
  FiTwitter,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import { ListGroup } from "reactstrap";
import { UserProfile } from "../../store/User";
import SocialMediaListItem from "./SocialMediaListItem";

interface SocialMediaListProps {
  profile: UserProfile;
}

const SocialMediaList = (props: SocialMediaListProps) => {
  const {
    websiteUrl,
    youtubeUrl,
    twitterUrl,
    instagramUrl,
    facebookUrl,
  } = props.profile;
  return (
    <ListGroup>
      <SocialMediaListItem
        icon={<FiGlobe size={24} className="mr-2" />}
        heading="Website"
        url={websiteUrl}
      />
      <SocialMediaListItem
        icon={<FiYoutube size={24} className="mr-2" />}
        heading="Youtube"
        url={youtubeUrl}
      />
      <SocialMediaListItem
        icon={<FiTwitter size={24} className="mr-2" />}
        heading="Twitter"
        url={twitterUrl}
      />
      <SocialMediaListItem
        icon={<FiInstagram size={24} className="mr-2" />}
        heading="Instagram"
        url={instagramUrl}
      />
      <SocialMediaListItem
        icon={<FiFacebook size={24} className="mr-2" />}
        heading="Facebook"
        url={facebookUrl}
      />
    </ListGroup>
  );
};

export default SocialMediaList;
