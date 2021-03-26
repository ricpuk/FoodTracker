import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import API, { API_USER_GOALS, API_USER_PROFILE } from "../utils/api";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CoachingState {
  coaches: UserInfo[];
  clients: UserInfo[];
  coach?: UserInfo;
  coachingRequests: CoachingRequest;
  coachesPage?: number;
  coachesLoading: boolean;
}

export interface CoachingRequest {}

export interface UserInfo {
  id: number;
}

const RESOURCE_URL = "api/coaching";

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface FetchCoachesAction {
  type: "FETCH_COACHES";
  page: number;
}

interface ReceiveCoachesAction {
  type: "RECEIVE_COACHES";
  coaches: UserInfo[];
}

interface FetchCoachingRequestsAction {
  type: "FETCH_COACHING_REQUESTS";
}

interface ReceiveCoachingRequestsAction {
  type: "RECEIVE_COACHING_REQUESTS";
  requests: CoachingRequest[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
  | FetchCoachesAction
  | ReceiveCoachesAction
  | FetchCoachingRequestsAction
  | ReceiveCoachingRequestsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  fetchCoaches: (page: number): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.coaching) {
      API.get<UserInfo[]>(RESOURCE_URL).then((response) => {
        const { data } = response;
        dispatch({ type: "RECEIVE_COACHES", coaches: data });
      });

      dispatch({ type: "FETCH_COACHES", page: page });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CoachingState = {
  coaches: [],
  clients: [],
  coach: undefined,
  coachingRequests: [],
  coachesLoading: false,
  coachesPage: undefined,
};

export const reducer: Reducer<CoachingState> = (
  state: CoachingState | undefined,
  incomingAction: Action
): CoachingState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "FETCH_COACHES":
      return {
        ...state,
        coachesPage: action.page,
        coachesLoading: true,
      };
    case "RECEIVE_COACHES":
      return {
        ...state,
        coaches: action.coaches,
        coachesLoading: false,
      };
    default:
      return { ...state };
  }
};
