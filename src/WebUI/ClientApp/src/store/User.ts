import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import API, { API_USER_GOALS } from "../utils/api";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface UserState {
  isLoading: boolean;
  goals?: UserGoals;
  goalsLoading: boolean;
}

export interface UserGoals {
  id: number;
  caloriesGoal: number;
  proteinGoal: number;
  carbohydratesGoal: number;
  fatsGoal: number;
  waterGoal: number;
}

const RESOURCE_URL = "api/user";

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetUserGoalsAction {
  type: "SET_GOALS";
  goals: UserGoals;
}

interface RequestUserGoalsAction {
  type: "REQUEST_GOALS";
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetUserGoalsAction | RequestUserGoalsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  setUserGoals: (goals: UserGoals): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.user) {
      dispatch({ type: "SET_GOALS", goals });
    }
  },
  fetchUserGoals: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState && appState.user && !appState.user.goals) {
      API.get<UserGoals>(API_USER_GOALS).then((response) => {
        const { data, status } = response;
        if (status === 204) {
          return;
        }
        dispatch({ type: "SET_GOALS", goals: data });
      });

      dispatch({ type: "REQUEST_GOALS" });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: UserState = {
  isLoading: false,
  goals: undefined,
  goalsLoading: false,
};

export const reducer: Reducer<UserState> = (
  state: UserState | undefined,
  incomingAction: Action
): UserState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "SET_GOALS":
      return {
        ...state,
        goals: action.goals,
        goalsLoading: false,
      };
    case "REQUEST_GOALS":
      return {
        ...state,
        goalsLoading: true,
      };
    default:
      return { ...state };
  }
};
