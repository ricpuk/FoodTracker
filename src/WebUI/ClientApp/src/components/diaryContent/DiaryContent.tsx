import classnames from "classnames";
import React, { useState } from "react";
import { Nav, NavItem, TabContent, TabPane, NavLink, Alert } from "reactstrap";
import DiarySection from "../diarySection/DiarySection";
import * as DiariesStore from "../../store/Diaries";
import AddDiaryEntryForm from "../addDiaryEntry/AddDiaryEntryForm";

interface DiaryContentProps {
  toggleModal?: (diaryEntry?: DiariesStore.DiaryEntry) => void;
  diary?: DiariesStore.Diary;
}

const DiaryContent = (props: DiaryContentProps) => {
  const { diary, toggleModal } = props;

  const [activeTab, setActiveTab] = useState(
    DiariesStore.DiarySection.Breakfast
  );

  const toggle = (id: DiariesStore.DiarySection) => {
    if (activeTab !== id) {
      setActiveTab(id);
    }
  };

  const getDiarySection = (section: DiariesStore.DiarySection) => {
    if (!diary) {
      return [];
    }
    const entries = diary.entries.filter((x) => x.diarySection === section);
    return entries;
  };

  if (!diary) {
    return <Alert color="danger">Error</Alert>;
  }

  return (
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
      {diary && (
        <AddDiaryEntryForm diaryId={diary.id} diarySection={activeTab} />
      )}
    </div>
  );
};
export default DiaryContent;
