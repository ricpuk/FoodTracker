import React, { ChangeEvent, useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { UserProfile } from "../../store/User";
import API from "../../utils/api";
import LineChart from "../lineChart/LineChart";
import LinkButton from "../linkButton/LinkButton";
import SocialMediaList from "../socialMediaList/SocialMediaList";
import ProfileInfo from "./ProfileInfo";
import { FiCamera } from "react-icons/fi";
import "./Profile.css";
import classnames from "classnames";
import { useDispatch } from "react-redux";
import * as UserStore from "../../store/User";
import Toaster from "../../utils/toaster";
import ProfilePicture from "./ProfilePicture";

const MODE_COACH = "coach";
const MODE_ME = "me";
const MODE_CLIENT = "client";

interface ProfileProps {
  profile: UserProfile;
  primaryClick?: () => void;
  secondaryClick?: () => void;
  viewMode: typeof MODE_COACH | typeof MODE_ME | typeof MODE_CLIENT;
}

interface UserStat {
  date: Date;
  waterIntake: number;
  weight: number;
}

const Profile = (props: ProfileProps) => {
  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState<UserStat[]>();
  const inputFile = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const { profile, viewMode, primaryClick, secondaryClick } = props;
  const { firstName, lastName } = profile;

  const getDataPoints = (type: string) => {
    if (statsLoading || !stats) {
      return [];
    }
    const dataPoints: any[] = [];
    stats.map((value) => {
      if (type === "water") {
        dataPoints.push({ x: new Date(value.date), y: value.waterIntake });
      } else {
        if (value.weight > 0) {
          dataPoints.push({ x: new Date(value.date), y: value.weight });
        }
      }
    });
    return dataPoints;
  };

  const openFileDialog = () => {
    if (viewMode !== "me" || !inputFile || !inputFile.current) {
      return;
    }
    inputFile.current.click();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (viewMode !== "me") {
      return;
    }
    const { files: newFiles } = e.target;
    if (newFiles == null) {
      return;
    }
    const uploadedFile = newFiles[0];

    const formData = new FormData();
    formData.append("file", uploadedFile);

    API.post<string>(`/api/users/profile/photo`, formData)
      .then((result) => {
        dispatch(UserStore.actionCreators.updateProfilePicture(result.data));
        Toaster.success("Success", "Profile photo uploaded");
      })
      .catch((e) => {
        Toaster.error("Error", "Something went wrong.");
      });
  };

  const renderButtons = () => {
    if (viewMode == MODE_ME) {
      return [
        <Button
          color="primary"
          className="w-100 mr-2"
          onClick={() => primaryClick && primaryClick()}
        >
          Edit profile
        </Button>,
        <Button
          color="secondary"
          className="w-100 ml-2"
          onClick={() => secondaryClick && secondaryClick()}
        >
          Edit goals
        </Button>,
      ];
    }
    return [
      <LinkButton
        to="diary"
        color="primary"
        className="w-100 mr-2"
        onClick={() => primaryClick && primaryClick()}
        text="View diary"
      />,
      <Button
        color="secondary"
        className="w-100 ml-2"
        onClick={() => secondaryClick && secondaryClick()}
      >
        Edit goals
      </Button>,
    ];
  };

  React.useEffect(() => {
    setStatsLoading(true);
    API.get<UserStat[]>(`api/users/profile/${profile.id}/stats`)
      .then((response) => {
        const { data } = response;
        setStats(data);
      })
      .finally(() => setStatsLoading(false));
  }, []);

  return (
    <Row className="gutters-sm">
      <Col md="4" className="mb-3">
        <Card>
          <CardBody>
            <div className="d-flex flex-column align-items-center text-center">
              <div
                className={classnames({
                  "interactive-container": viewMode === "me",
                })}
                style={{ position: "relative" }}
                onClick={openFileDialog}
              >
                <ProfilePicture url={profile.profilePicture} />
                {viewMode === "me" && (
                  <div
                    className="bg-light rounded-circle interactive d-flex flex-column justify-content-center"
                    style={{
                      width: 150,
                      height: 150,
                      position: "absolute",
                      top: 0,
                      opacity: 0.8,
                    }}
                  >
                    <FiCamera className="m-auto" size="60" />
                  </div>
                )}
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={handleFileUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>

              <div className="mt-3">
                <h4>
                  {firstName} {lastName}
                </h4>
                <p className="text-secondary mb-1">
                  {profile.shortDescription}
                </p>
              </div>
            </div>
            {viewMode != MODE_COACH && (
              <div className="d-flex mt-2">{renderButtons()}</div>
            )}
          </CardBody>
        </Card>
        <Card className="mt-3">
          <SocialMediaList profile={profile} />
        </Card>
      </Col>
      <Col md="8">
        <ProfileInfo profile={profile} />
        <Row className="gutters-sm">
          <Col sm="12" className="mb-3">
            <Card className="h-100">
              <CardHeader>Weight (kg)</CardHeader>
              <CardBody>
                <LineChart data={getDataPoints("weight")} color="red" />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" className="mb-3">
            <Card className="h-100">
              <CardHeader>Water intake (ml)</CardHeader>
              <CardBody>
                <LineChart data={getDataPoints("water")} color="blue" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Profile;
