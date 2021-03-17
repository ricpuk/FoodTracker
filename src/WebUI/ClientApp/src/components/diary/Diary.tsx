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
  const [activeTab, setActiveTab] = useState(
    DiariesStore.DiarySection.Breakfast
  );

  React.useEffect(() => {
    if (!props.date) {
      const date = new Date().toISOString().split("T")[0];
      requestDiary(date);
    }
  });

  const toggle = (id: DiariesStore.DiarySection) => {
    if (activeTab !== id) {
      setActiveTab(id);
    }
  };

  const renderDailySummary = () => (
    <div className="my-3">
      <h4>Daily summary</h4>
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

  const toggleModal = (diaryEntry?: DiariesStore.DiaryEntry) => {
    if (!diaryEntry) {
      return props.toggleModalState();
    }
    props.toggleModalStateForEdit(diaryEntry);
  };

  const renderDiaryContent = () => (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === DiariesStore.DiarySection.Breakfast,
            })}
            onClick={() => {
              toggle(DiariesStore.DiarySection.Breakfast);
            }}
          >
            Breakfast
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === DiariesStore.DiarySection.Lunch,
            })}
            onClick={() => {
              toggle(DiariesStore.DiarySection.Lunch);
            }}
          >
            Lunch
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === DiariesStore.DiarySection.Dinner,
            })}
            onClick={() => {
              toggle(DiariesStore.DiarySection.Dinner);
            }}
          >
            Dinner
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={DiariesStore.DiarySection.Breakfast}>
          <DiarySection
            items={getDiarySection(DiariesStore.DiarySection.Breakfast)}
            toggleModal={toggleModal}
          />
        </TabPane>
        <TabPane tabId={DiariesStore.DiarySection.Lunch}>
          <DiarySection
            items={getDiarySection(DiariesStore.DiarySection.Lunch)}
            toggleModal={toggleModal}
          />
        </TabPane>
        <TabPane tabId={DiariesStore.DiarySection.Dinner}>
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
      {props.diaries[props.date] && (
        <AddDiaryEntryForm
          diaryId={props.diaries[props.date].id}
          diarySection={activeTab}
        />
      )}
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.diaries, // Selects which state properties are merged into the component's props
  DiariesStore.actionCreators
)(Diary as any); // eslint-disable-line @typescript-eslint/no-explicit-any
