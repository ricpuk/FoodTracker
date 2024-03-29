import { Action, Reducer } from "redux";
import API from "../utils/api";
import { AppThunkAction } from ".";
import { Product } from "./Products";
import { UserGoals } from "./User";
import Toaster from "../utils/toaster";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DiariesState {
  isLoading: boolean;
  isWaterLoading: boolean;
  isWeightLoading: boolean;
  isCreateLoading: boolean;
  isModalOpen: boolean;
  diaries: { [date: string]: Diary };
  date: string;
  modalType: DiaryModalType;
  editedEntry?: DiaryEntry;
}

export interface Diary {
  id: number;
  date: string;
  entries: DiaryEntry[];
  userGoals: UserGoals;
  weight: number;
  waterIntake: number;
}

export enum DiarySection {
  Breakfast,
  Lunch,
  Dinner,
}

export interface DiaryEntry {
  id: number;
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

interface ToggleModalEdit {
  type: "TOGGLE_MODAL_EDIT";
  state: boolean;
  entry: DiaryEntry;
}

interface AddDiaryEntry {
  type: "ADD_DIARY_ENTRY";
  entry: DiaryEntry;
}

interface ReplaceDiaryEntry {
  type: "REPLACE_DIARY_ENTRY";
  entry: DiaryEntry;
  index: number;
}

interface RemoveDiaryEntry {
  type: "REMOVE_DIARY_ENTRY";
  index: number;
}

interface LogWeightAction {
  type: "LOG_WEIGHT";
}

interface LogWeightResponseAction {
  type: "LOG_WEIGHT_RESPONSE";
  date: string;
  amount: number;
}

interface LogWaterResponseAction {
  type: "LOG_WATER_RESPONSE";
  date: string;
  waterIntake: number;
}

interface LogWaterAction {
  type: "LOG_WATER";
}

interface ReceiveDiaryErrorAction {
  type: "RECEIVE_DIARY_ERROR";
}

export enum DiaryModalType {
  new = "new",
  edit = "edit",
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
  | RequestDiaryAction
  | ReceiveDiaryAction
  | ToggleModalState
  | AddDiaryEntry
  | ToggleModalEdit
  | ReplaceDiaryEntry
  | RemoveDiaryEntry
  | LogWeightAction
  | LogWaterAction
  | LogWaterResponseAction
  | LogWeightResponseAction
  | ReceiveDiaryErrorAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  requestDiary: (
    date: string,
    reload: boolean = false
  ): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.diaries) {
      API.get<Diary>(`${RESOURCE_URL}/${date}`)
        .then((response) => {
          const { data } = response;
          const date = data.date.slice(0, 10);
          data.date = date;
          dispatch({ type: "RECEIVE_DIARY", diary: data, date: date });
        })
        .catch((error) => {
          Toaster.error("Error", "Failed to fetch diary.");
        })
        .finally(() => {
          dispatch({ type: "RECEIVE_DIARY_ERROR" });
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
  toggleModalStateForEdit: (
    diaryEntry: DiaryEntry
  ): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState && appState.diaries && !appState.diaries.isModalOpen) {
      dispatch({
        type: "TOGGLE_MODAL_EDIT",
        state: true,
        entry: diaryEntry,
      });
    }
  },
  addDiaryEntry: (entry: DiaryEntry): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    const { diaries } = appState;
    if (appState && diaries && diaries.date && diaries.diaries[diaries.date]) {
      const diary = diaries.diaries[diaries.date];
      const index = diary.entries.findIndex((x) => x.id === entry.id);
      if (index === -1) {
        dispatch({ type: "ADD_DIARY_ENTRY", entry: entry });
        return;
      }
      dispatch({ type: "REPLACE_DIARY_ENTRY", entry: entry, index: index });
    }
  },
  removeEditedDiaryEntry: (entryId: number): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    const { diaries } = appState;
    if (appState && diaries && diaries.date && diaries.diaries[diaries.date]) {
      const diary = diaries.diaries[diaries.date];
      const index = diary.entries.findIndex((x) => x.id === entryId);
      if (index === -1) {
        return;
      }
      dispatch({ type: "REMOVE_DIARY_ENTRY", index: index });
    }
  },
  logWater: (date: string, amount: number): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    const { diaries } = appState;
    if (
      appState &&
      diaries &&
      diaries.date === date &&
      diaries.diaries[diaries.date]
    ) {
      API.post<number>(`${RESOURCE_URL}/${date}/water`, { amount: amount })
        .then((response) => {
          const { data } = response;
          dispatch({
            type: "LOG_WATER_RESPONSE",
            date: date,
            waterIntake: data,
          });
          Toaster.success(
            "Success",
            "Your water intake was logged successfully."
          );
        })
        .catch((error) => {
          Toaster.error("Error", "Failed to log water intake.");
        });
      dispatch({ type: "LOG_WATER" });
    }
  },
  logWeight: (date: string, weight: number): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    const { diaries } = appState;
    if (
      appState &&
      diaries &&
      diaries.date === date &&
      diaries.diaries[diaries.date]
    ) {
      API.post(`${RESOURCE_URL}/${date}/weight`, { weight: weight })
        .then(() => {
          dispatch({
            type: "LOG_WEIGHT_RESPONSE",
            date: date,
            amount: weight,
          });
          Toaster.success(
            "Success",
            "Your weight entry was saved successfully."
          );
        })
        .catch((error) => {
          Toaster.error("Error", "Failed to log your weight.");
        });
      dispatch({ type: "LOG_WEIGHT" });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DiariesState = {
  diaries: {},
  date: "",
  isLoading: false,
  isWaterLoading: false,
  isWeightLoading: false,
  isCreateLoading: false,
  isModalOpen: false,
  modalType: DiaryModalType.new,
  editedEntry: undefined,
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
      state.diaries[action.date] = action.diary;
      return {
        ...state,
        diaries: state.diaries,
        date: action.date,
        isLoading: false,
      };
    case "TOGGLE_MODAL":
      const modalType = !state.isModalOpen
        ? DiaryModalType.new
        : state.modalType;
      return {
        ...state,
        modalType: modalType,
        isModalOpen: !state.isModalOpen,
      };
    case "ADD_DIARY_ENTRY":
      state.diaries[state.date].entries.push(action.entry);
      return {
        ...state,
      };
    case "REPLACE_DIARY_ENTRY":
      state.diaries[state.date].entries[action.index] = action.entry;
      return {
        ...state,
      };
    case "TOGGLE_MODAL_EDIT":
      return {
        ...state,
        isModalOpen: action.state,
        modalType: DiaryModalType.edit,
        editedEntry: action.entry,
      };
    case "REMOVE_DIARY_ENTRY": {
      state.diaries[state.date].entries.splice(action.index, 1);
      return {
        ...state,
      };
    }
    case "LOG_WATER": {
      return {
        ...state,
        isWaterLoading: true,
      };
    }
    case "LOG_WEIGHT": {
      return {
        ...state,
        isWeightLoading: true,
      };
    }
    case "LOG_WATER_RESPONSE": {
      const diary = state.diaries[action.date];
      diary.waterIntake = action.waterIntake;
      state.diaries[action.date] = diary;
      return {
        ...state,
        isWaterLoading: false,
      };
    }
    case "LOG_WEIGHT_RESPONSE": {
      const diary = state.diaries[action.date];
      diary.weight = action.amount;
      state.diaries[action.date] = diary;
      return {
        ...state,
        isWeightLoading: false,
      };
    }
    case "RECEIVE_DIARY_ERROR": {
      return {
        ...state,
        isLoading: false,
      };
    }
  }

  return state;
};
