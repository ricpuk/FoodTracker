import { Action, Reducer } from 'redux';
import API from '../utils/api';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface PhrasesState {
    isLoading: boolean;
    page?: number;
    phrases: Phrase[];
}

export interface Phrase {
    id: number;
    translations: PhraseTranslation[];
}

export interface PhraseTranslation {
    languageCode: LanguageCode
    text: string
}

export enum LanguageCode {
    LT,
    EN
}

const RESOURCE_URL = 'api/phrases'

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestPhrasesAction {
    type: 'REQUEST_PHRASES';
    page: number;
}

interface ReceivePhrasesAction {
    type: 'RECEIVE_PHRASES';
    page: number;
    phrases: Phrase[];
}

interface PhrasesResponse {
    items: Phrase[]   
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestPhrasesAction | ReceivePhrasesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestPhrases: (page: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.phrases && page !== appState.phrases.page) {
            API.get<PhrasesResponse>(RESOURCE_URL)
                .then(response => {
                    const {data} = response
                    dispatch({ type: 'RECEIVE_PHRASES', page: page, phrases: data.items});
                });

            dispatch({ type: 'REQUEST_PHRASES', page: page });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: PhrasesState = { phrases: [], isLoading: false};

export const reducer: Reducer<PhrasesState> = (state: PhrasesState | undefined, incomingAction: Action): PhrasesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PHRASES':
            return {
                phrases: state.phrases,
                page: state.page,
                isLoading: true,

            };
        case 'RECEIVE_PHRASES':
            if (action.page === state.page || action.page === 0) {
                return {
                    phrases: action.phrases,
                    page: action.page,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
