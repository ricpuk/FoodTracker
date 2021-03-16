import classnames from "classnames";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { ApplicationState } from "../../store";
import DatePicker from "../datePicker/datePicker";
import DiarySection from "../diarySection/DiarySection";
import * as DiariesStore from "../../store/Diaries";
import Loader from "../loader/Loader";
import "./Diary.css";
import AddDiaryEntryForm from "../addDiaryEntry/AddDiaryEntryForm";
import CaloriesBreakdown from "../caloriesBreakdown/CaloriesBreakdown";

type DiaryProps = DiariesStore.DiariesState & // ... state we've requested from the Redux store
  typeof DiariesStore.actionCreators; // ... plus action creators we've requested

const Diary = (props: DiaryProps) => {
  const [activeTab, setActiveTab] = useState("breakfast");

  React.useEffect(() => {
    if (!props.date) {
      const date = new Date().toISOString().split("T")[0];
      requestDiary(date);
    }
  });

  const toggle = (id: string) => {
    activeTab === id ? setActiveTab("") : setActiveTab(id);
  };
  const renderDailySummary = () => (
    <div className="my-3">
      <h4>Today's summary...</h4>
      <CaloriesBreakdown
        prefix="daily"
        remaining={540}
        protein={67.5}
        carbs={135}
        fats={50}
      />
    </div>
  );
  const renderDatePicker = () => (
    <div className="my-2">
      <DatePicker date={props.date} dateSelected={requestDiary} />
    </div>
  );

  const getDiarySection = (section: DiariesStore.DiarySection) => {
    if (!props.diaries[props.date]) {
      return [];
    }
    const diary = props.diaries[props.date];
    return diary.entries.filter((x) => x.diarySection === section);
  };

  const toggleModal = () => {
    props.toggleModalState();
  };

  const renderDiaryContent = () => (
    <div>
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
          <DiarySection
            items={getDiarySection(DiariesStore.DiarySection.Breakfast)}
            toggleModal={toggleModal}
          />
        </TabPane>
        <TabPane tabId="lunch">
          <DiarySection
            items={getDiarySection(DiariesStore.DiarySection.Lunch)}
            toggleModal={toggleModal}
          />
        </TabPane>
        <TabPane tabId="dinner">
          <DiarySection
            items={getDiarySection(DiariesStore.DiarySection.Dinner)}
            toggleModal={toggleModal}
          />
        </TabPane>
      </TabContent>
    </div>
  );

  const requestDiary = (date: string) => {
    props.requestDiary(date);
  };

  return (
    <div>
      <Loader isLoading={props.isLoading}>
        {renderDailySummary()}
        {renderDatePicker()}
        {renderDiaryContent()}
      </Loader>
      <AddDiaryEntryForm />
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.diaries, // Selects which state properties are merged into the component's props
  DiariesStore.actionCreators
)(Diary as any); // eslint-disable-line @typescript-eslint/no-explicit-any
