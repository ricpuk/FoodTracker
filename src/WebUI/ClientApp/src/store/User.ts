import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import API, { API_USER_GOALS, API_USER_PROFILE } from "../utils/api";
import Toaster from "../utils/toaster";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface UserState {
  isLoading: boolean;
  profile?: UserProfile;
  goalsLoading: boolean;
  initialized: boolean;
  profileModalOpen: boolean;
  profileModalLoading: boolean;
}

export interface UserGoals {
  id: number;
  caloriesGoal: number;
  proteinGoal: number;
  carbohydratesGoal: number;
  fatsGoal: number;
  waterGoal: number;
  startingWeight: number;
  weightGoal: number;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  shortDescription: string;
  profilePicture: string;
  trainer?: UserProfile;
  websiteUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  numberOfClients: number;
  coachingRequested: boolean;
  goals?: UserGoals;
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

interface RequestUserProfileAction {
  type: "REQUEST_PROFILE";
}

interface SetUserProfileAction {
  type: "RECEIVE_PROFILE";
  profile: UserProfile;
}
interface UpdateUserProfile {
  type: "UPDATE_PROFILE";
}
interface UpdateUserProfileResponse {
  type: "UPDATE_PROFILE_RESPONSE";
  profile: UserProfile;
}
interface ToggleProfileModal {
  type: "TOGGLE_PROFILE_MODAL";
}
interface SetProfilePhotoAction {
  type: "SET_PROFILE_PHOTO";
  photo: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
  | SetUserGoalsAction
  | RequestUserGoalsAction
  | RequestUserProfileAction
  | SetUserProfileAction
  | UpdateUserProfile
  | UpdateUserProfileResponse
  | ToggleProfileModal
  | SetProfilePhotoAction;

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
    if (
      appState &&
      appState.user &&
      appState.user.profile &&
      !appState.user.profile.goals
    ) {
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
  fetchUserProfile: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState && appState.user && !appState.user.profile) {
      API.get<UserProfile>(API_USER_PROFILE)
        .then((response) => {
          const { data, status } = response;
          if (status === 204) {
            return;
          }
          dispatch({ type: "RECEIVE_PROFILE", profile: data });
        })
        .catch((error) => {
          //do nothing, should be handled by axios
        });

      dispatch({ type: "REQUEST_PROFILE" });
    }
  },
  updateUserProfile: (profile: UserProfile): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.user) {
      const request = {
        profile: profile,
      };
      API.put<UserProfile>(API_USER_PROFILE, request)
        .then((response) => {
          const { data } = response;
          dispatch({ type: "UPDATE_PROFILE_RESPONSE", profile: data });
          Toaster.success("Success", "Profile updated.");
        })
        .catch((error) => {
          Toaster.error(
            "Error",
            "There was an issue while updating your profile."
          );
        });

      dispatch({ type: "UPDATE_PROFILE" });
    }
  },
  toggleProfileModal: (): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.user) {
      dispatch({ type: "TOGGLE_PROFILE_MODAL" });
    }
  },
  updateProfilePicture: (url: string): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.user) {
      dispatch({ type: "SET_PROFILE_PHOTO", photo: url });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: UserState = {
  isLoading: false,
  goalsLoading: false,
  initialized: false,
  profileModalOpen: false,
  profileModalLoading: false,
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
      if (!state.profile) {
        return { ...state, goalsLoading: false };
      }
      const profile = state.profile;
      profile.goals = action.goals;
      return {
        ...state,
        profile: profile,
        goalsLoading: false,
      };
    case "REQUEST_GOALS":
      return {
        ...state,
        goalsLoading: true,
      };
    case "REQUEST_PROFILE":
      return {
        ...state,
      };
    case "RECEIVE_PROFILE":
      return {
        ...state,
        initialized: true,
        profile: action.profile,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        profileModalLoading: true,
      };
    case "UPDATE_PROFILE_RESPONSE":
      return {
        ...state,
        profileModalLoading: false,
        profile: action.profile,
        profileModalOpen: false,
      };
    case "TOGGLE_PROFILE_MODAL":
      return {
        ...state,
        profileModalOpen: !state.profileModalOpen,
      };
    case "SET_PROFILE_PHOTO":
      if (state.profile) {
        state.profile.profilePicture = action.photo;
      }
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};
