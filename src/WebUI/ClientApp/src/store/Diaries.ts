import { Action, Reducer } from "redux";
import API from "../utils/api";
import { AppThunkAction } from ".";
import { Product } from "./Products";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DiariesState {
  isLoading: boolean;
  isCreateLoading: boolean;
  isModalOpen: boolean;
  diaries: { [date: string]: Diary };
  date: string;
}

export interface Diary {
  id: number;
  date: string;
  entries: DiaryEntry[];
}

export enum DiarySection {
  Breakfast,
  Lunch,
  Dinner,
}

export interface DiaryEntry {
  product: Product;
  productId: number;
  servingId: number;
  numberOfServings: number;
  diarySection: DiarySection;
}

const RESOURCE_URL = "api/diaries";

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestDiaryAction {
  type: "REQUEST_DIARY";
  date: string;
}

interface ReceiveDiaryAction {
  type: "RECEIVE_DIARY";
  date: string;
  diary: Diary;
}

interface ToggleModalState {
  type: "TOGGLE_MODAL";
  state: boolean;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestDiaryAction | ReceiveDiaryAction | ToggleModalState;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  requestDiary: (date: string): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.diaries && date !== appState.diaries.date) {
      API.get<Diary>(`${RESOURCE_URL}/${date}`)
        .then((response) => {
          const { data } = response;
          const date = data.date.slice(0, 10);
          dispatch({ type: "RECEIVE_DIARY", diary: data, date: date });
        })
        .catch((error) => {
          console.log(error);
        });

      dispatch({ type: "REQUEST_DIARY", date: date });
    }
  },
  toggleModalState: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState && appState.diaries) {
      dispatch({ type: "TOGGLE_MODAL", state: !appState.diaries.isModalOpen });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DiariesState = {
  diaries: {},
  date: "",
  isLoading: false,
  isCreateLoading: false,
  isModalOpen: false,
};

export const reducer: Reducer<DiariesState> = (
  state: DiariesState | undefined,
  incomingAction: Action
): DiariesState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_DIARY":
      return {
        ...state,
        date: action.date,
        isLoading: true,
      };
    case "RECEIVE_DIARY":
      if (action.date === state.date) {
        state.diaries[action.date] = action.diary;
        return {
          ...state,
          diaries: state.diaries,
          date: action.date,
          isLoading: false,
        };
      }
      break;
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
  }

  return state;
};
