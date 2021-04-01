import React, { useEffect, useState } from "react";
import { Button, Toast, ToastBody, ToastHeader } from "reactstrap";
import API, { API_USER_GOALS } from "../utils/api";
import GoalsForm from "./goalsForm/GoalsForm";
import { toastr } from "react-redux-toastr";
import Toaster from "../utils/toaster";

const Home = () => {
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    API.get(API_USER_GOALS)
      .then((response) => {
        const { data, status } = response;
        if (status === 204) {
          return toggleGoals();
        }
        navigateToDiaries();
      })
      .catch((err) => {
        Toaster.error("Error", "Failed to fetch your goals.");
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const toggleGoals = () => {
    setGoalsOpen(!goalsOpen);
  };

  const navigateToDiaries = () => {
    //nav code here
  };
  return (
    <React.Fragment>
      <GoalsForm
        initial={true}
        isOpen={goalsOpen}
        toggle={toggleGoals}
        type="personal"
      />
    </React.Fragment>
  );
};

export default Home;
