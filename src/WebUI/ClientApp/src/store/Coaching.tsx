import { AxiosRequestConfig } from "axios";
import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import API from "../utils/api";
import { GetListResponse } from "../utils/interfaces";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CoachingState {
  coaches: CoachInfo[];
  clients: UserInfo[];
  coach?: UserInfo;
  coachingRequests: CoachingRequest;
  coachesPage?: number;
  coachesLoading: boolean;
}

export interface CoachingRequest {}

export interface CoachInfo {
  id: number;
  firstName: string;
  lastName: string;
  shortDescription: string;
  numberOfClients: number;
  coachingRequested: boolean;
}

export interface UserInfo {
  id: number;
}

const COACH_RESOURCE_URL = "api/coaches";

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface FetchCoachesAction {
  type: "FETCH_COACHES";
  page: number;
}

interface ReceiveCoachesAction {
  type: "RECEIVE_COACHES";
  page: number;
  coaches: CoachInfo[];
}

interface FetchCoachingRequestsAction {
  type: "FETCH_COACHING_REQUESTS";
}

interface ReceiveCoachingRequestsAction {
  type: "RECEIVE_COACHING_REQUESTS";
  requests: CoachingRequest[];
}

interface SendCoachingRequestAction {
  type: "SEND_COACHING_REQUEST";
}

interface SendCoachingRequestActionDone {
  type: "SEND_COACHING_REQUEST_DONE";
  coachId: number;
}

interface RevokeCoachingRequestAction {
  type: "REVOKE_COACHING_REQUEST";
}

interface RevokeCoachingRequestActionDone {
  type: "REVOKE_COACHING_REQUEST_DONE";
  coachId: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
  | FetchCoachesAction
  | ReceiveCoachesAction
  | FetchCoachingRequestsAction
  | ReceiveCoachingRequestsAction
  | SendCoachingRequestAction
  | SendCoachingRequestActionDone
  | RevokeCoachingRequestAction
  | RevokeCoachingRequestActionDone;

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
      const config: AxiosRequestConfig = {
        params: {
          page: page,
        },
      };
      API.get<GetListResponse<CoachInfo>>(COACH_RESOURCE_URL, config).then(
        (response) => {
          const { items } = response.data;
          dispatch({ type: "RECEIVE_COACHES", coaches: items, page: page });
        }
      );

      dispatch({ type: "FETCH_COACHES", page: page });
    }
  },
  requestCoaching: (coach: CoachInfo): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (
      appState &&
      appState.coaching &&
      appState.coaching.coaches.findIndex((x) => x.id === coach.id) != -1
    ) {
      const request = {};
      API.post(`${COACH_RESOURCE_URL}/${coach.id}`, request).then(
        (response) => {
          dispatch({ type: "SEND_COACHING_REQUEST_DONE", coachId: coach.id });
        }
      );

      dispatch({ type: "SEND_COACHING_REQUEST" });
    }
  },
  revokeCoachingRequest: (coach: CoachInfo): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (
      appState &&
      appState.coaching &&
      appState.coaching.coaches.findIndex((x) => x.id === coach.id) != -1
    ) {
      const request = {};
      API.delete(`${COACH_RESOURCE_URL}/${coach.id}`).then((response) => {
        dispatch({ type: "REVOKE_COACHING_REQUEST_DONE", coachId: coach.id });
      });

      dispatch({ type: "REVOKE_COACHING_REQUEST" });
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
      if (action.page === state.coachesPage) {
        return {
          ...state,
          coaches: action.coaches,
          coachesPage: action.page,
          coachesLoading: false,
        };
      }
    case "SEND_COACHING_REQUEST":
    case "REVOKE_COACHING_REQUEST":
      return {
        ...state,
        coachesLoading: true,
      };
    case "SEND_COACHING_REQUEST_DONE":
      const indexSend = state.coaches.findIndex((x) => x.id === action.coachId);
      if (indexSend !== -1) {
        state.coaches[indexSend].coachingRequested = true;
      }
      return {
        ...state,
        coachesLoading: false,
      };
    case "REVOKE_COACHING_REQUEST_DONE":
      const indexRevoke = state.coaches.findIndex(
        (x) => x.id === action.coachId
      );
      if (indexRevoke !== -1) {
        state.coaches[indexRevoke].coachingRequested = false;
      }
      return {
        ...state,
        coachesLoading: false,
      };

    default:
      return { ...state };
  }
};
