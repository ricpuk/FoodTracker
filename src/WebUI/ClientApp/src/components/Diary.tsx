import classnames from "classnames";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Nav,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
  Tooltip,
} from "reactstrap";
import DatePicker from "./datePicker/datePicker";
import DiarySection from "./diarySection/DiarySection";

const Diary = () => {
  React.useEffect(() => {}, []);

  const [activeTab, setActiveTab] = useState("breakfast");
  const [proteinOpen, setProteinOpen] = useState(false);
  const [carbsOpen, setCarbsOpen] = useState(false);
  const [fatsOpen, setFatsOpen] = useState(false);
  const [remainingOpen, setRemainingOpen] = useState(false);
  const toggle = (id: string) => {
    activeTab === id ? setActiveTab("") : setActiveTab(id);
  };

  const renderDailySummary = () => (
    <div className="my-3">
      <h4>Today's summary...</h4>
      <Progress multi>
        <Progress bar color="primary" value="15" id="protein-tt"></Progress>
        <Progress bar color="success" value="30" id="carbs-tt" />
        <Progress bar color="danger" value="25" id="fats-tt" />
        <Progress bar color="light" value="30" id="remaining-tt" />
      </Progress>
      <Tooltip
        placement="bottom"
        isOpen={proteinOpen}
        target="protein-tt"
        toggle={() => setProteinOpen(!proteinOpen)}
      >
        Proteins
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={carbsOpen}
        target="carbs-tt"
        toggle={() => setCarbsOpen(!carbsOpen)}
      >
        Carbs
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={fatsOpen}
        target="fats-tt"
        toggle={() => setFatsOpen(!fatsOpen)}
      >
        Fats
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={remainingOpen}
        target="remaining-tt"
        toggle={() => setRemainingOpen(!remainingOpen)}
      >
        Remaining
      </Tooltip>
    </div>
  );

  return (
    <div>
      {renderDailySummary()}
      <div className="my-2">
        <DatePicker date="2020-01-03" />
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "breakfast" })}
            onClick={() => {
              toggle("breakfast");
            }}
          >
            Breakfast
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "lunch" })}
            onClick={() => {
              toggle("lunch");
            }}
          >
            Lunch
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "dinner" })}
            onClick={() => {
              toggle("dinner");
            }}
          >
            Dinner
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="breakfast">
          <DiarySection />
        </TabPane>
        <TabPane tabId="lunch">
          <DiarySection />
        </TabPane>
        <TabPane tabId="dinner">
          <DiarySection />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default connect()(Diary);
