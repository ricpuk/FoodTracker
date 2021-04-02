import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { UserProfile } from "../../store/User";
import API from "../../utils/api";
import LineChart from "../lineChart/LineChart";
import LinkButton from "../linkButton/LinkButton";
import SocialMediaList from "../socialMediaList/SocialMediaList";
import ProfileInfo from "./ProfileInfo";

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
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                className="rounded-circle"
                width="150"
              />
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
              <div className="d-flex">{renderButtons()}</div>
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
