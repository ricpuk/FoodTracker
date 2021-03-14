import { Action, Reducer } from 'redux';
import API from '../utils/api';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DiariesState {
    isLoading: boolean;
    diaries: { [date: string] : Diary};
    date: string;
}

export interface Diary {
    id: number;
    date: string;
}

export enum DiarySection {
    Breakfast,
    Lunch,
    Dinner
}

export interface DiaryEntry {
    productId: number;
    servingId: number;
    numberOfServings: number;
    diarySection:DiarySection
}

const RESOURCE_URL = 'api/diaries'

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestDiaryAction {
    type: 'REQUEST_DIARY';
    date: string;
}

interface ReceiveDiaryAction {
    type: 'RECEIVE_DIARY';
    date: string;
    diary: Diary;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestDiaryAction | ReceiveDiaryAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestDiary: (date: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.diaries && date !== appState.diaries.date) {
            API.get<Diary>(`${RESOURCE_URL}/${date}`)
                .then(response => {
                    const {data} = response
                    const date = data.date.slice(0, 10)
                    dispatch({ type: 'RECEIVE_DIARY', diary: data, date: date});
                });

            dispatch({ type: 'REQUEST_DIARY', date: date });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DiariesState = { diaries: {}, date: '', isLoading: false};

export const reducer: Reducer<DiariesState> = (state: DiariesState | undefined, incomingAction: Action): DiariesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_DIARY':
            return {
                diaries: state.diaries,
                date: action.date,
                isLoading: true,

            };
        case 'RECEIVE_DIARY':
            if (action.date === state.date) {
                state.diaries[action.date] = action.diary
                return {
                    diaries: state.diaries,
                    date: action.date,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
