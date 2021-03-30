import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { UserProfile } from "../../store/User";
import API from "../../utils/api";
import LineChart from "../lineChart/LineChart";
import SocialMediaList from "../socialMediaList/SocialMediaList";
import ProfileInfo from "./ProfileInfo";

interface ProfileProps {
  profile: UserProfile;
}

interface UserStat {
  date: Date;
  waterIntake: number;
  weight: number;
}

const Profile = (props: ProfileProps) => {
  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState<UserStat[]>();

  const { profile } = props;
  const { firstName, lastName, numberOfClients, fitnessPoints } = profile;

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
