import classnames from "classnames";
import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { ApplicationState } from "../../store";
import * as UserStore from "../../store/User";
import { useAppParams } from "../../utils/hooks";

type EditProfileProps = UserStore.UserState & typeof UserStore.actionCreators;

enum FormNames {
  FirstName = "firstName",
  LastName = "lastName",
  ShortDescription = "shortDescription",
  Website = "website",
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",
  Facebook = "facebook",
}

const EditProfile = (props: EditProfileProps) => {
  const {
    profileModalLoading,
    profileModalOpen,
    profile,
    toggleProfileModal,
    updateUserProfile,
  } = props;

  const [firstName, setFirstName] = useState(profile ? profile.firstName : "");
  const [lastName, setLastName] = useState(profile ? profile.lastName : "");
  const [shortDescription, setShortDescription] = useState(
    profile ? profile.shortDescription : ""
  );
  const [website, setWebsite] = useState(profile ? profile.websiteUrl : "");
  const [facebook, setFacebook] = useState(profile ? profile.facebookUrl : "");
  const [twitter, setTwitter] = useState(profile ? profile.twitterUrl : "");
  const [youtube, setYoutube] = useState(profile ? profile.youtubeUrl : "");
  const [instagram, setInstagram] = useState(
    profile ? profile.instagramUrl : ""
  );
  const [isMobile] = useAppParams();
  const classBindings = {
    "full-screen": isMobile,
  };

  const toggleInner = () => {
    toggleProfileModal();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value, name } = target;
    switch (name) {
      case FormNames.FirstName:
        setFirstName(value);
        break;
      case FormNames.LastName:
        setLastName(value);
        break;
      case FormNames.ShortDescription:
        setShortDescription(value);
        break;
      case FormNames.Website:
        setWebsite(value);
        break;
      case FormNames.Facebook:
        setFacebook(value);
        break;
      case FormNames.Instagram:
        setInstagram(value);
        break;
      case FormNames.Twitter:
        setTwitter(value);
        break;
      case FormNames.Youtube:
        setYoutube(value);
        break;
    }
  };

  const submit = () => {
    const profile: UserStore.UserProfile = {
      id: 0,
      numberOfClients: 0,
      trainer: undefined,
      coachingRequested: false,
      firstName: firstName,
      lastName: lastName,
      shortDescription: shortDescription,
      websiteUrl: website,
      youtubeUrl: youtube,
      twitterUrl: twitter,
      facebookUrl: facebook,
      instagramUrl: instagram,
    };
    updateUserProfile(profile);
  };

  const inputFields = [
    {
      label: "Name",
      value: firstName,
      name: FormNames.FirstName,
      placeholder: "First name",
    },
    {
      label: "Last name",
      value: lastName,
      name: FormNames.LastName,
      placeholder: "Last name",
    },
    {
      label: "Short description",
      value: shortDescription,
      name: FormNames.ShortDescription,
      placeholder: "Short description",
    },
    {
      label: "Website",
      value: website,
      name: FormNames.Website,
      placeholder: "Website",
    },
    {
      label: "Youtube",
      value: youtube,
      name: FormNames.Youtube,
      placeholder: "Youtube",
    },
    {
      label: "Twitter",
      value: twitter,
      name: FormNames.Twitter,
      placeholder: "Twitter",
    },
    {
      label: "Instagram",
      value: instagram,
      name: FormNames.Instagram,
      placeholder: "Instagram",
    },
    {
      label: "Facebook",
      value: facebook,
      name: FormNames.Facebook,
      placeholder: "Facebook",
    },
  ];

  const renderForm = () =>
    inputFields.map((x) => (
      <Row className="border-bottom px-3">
        <Col xs="4" className="d-flex flex-column justify-content-center">
          {x.label}
        </Col>
        <Col xs="8">
          <Input
            type="text"
            className="border-0 no-hov p-0 text-left"
            value={x.value}
            name={x.name}
            placeholder={x.placeholder}
            onChange={handleChange}
          />
        </Col>
      </Row>
    ));

  return (
    <Modal
      isOpen={profileModalOpen}
      toggle={toggleInner}
      className={classnames(classBindings)}
    >
      <ModalHeader toggle={toggleInner}>Update profile</ModalHeader>
      <ModalBody>
        {renderForm()}
        <Button
          color="primary"
          disabled={profileModalLoading}
          className="mt-3 w-100"
          onClick={submit}
        >
          {profileModalLoading ? <Spinner color="light" /> : "Submit"}
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default connect(
  (state: ApplicationState) => state.user,
  UserStore.actionCreators
)(EditProfile as any);
