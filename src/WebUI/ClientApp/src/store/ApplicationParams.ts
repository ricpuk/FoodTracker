import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ApplicationParamsState {
    isMobile: boolean
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetIsMobileAction {
    type: 'SET_IS_MOBILE';
    isMobile: boolean
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetIsMobileAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setIsMobile: (isMobile: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.application && isMobile !== appState.application.isMobile) {
            dispatch({ type: 'SET_IS_MOBILE', isMobile: isMobile });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ApplicationParamsState = { isMobile: window.innerWidth > 500 ? false : true };

export const reducer: Reducer<ApplicationParamsState> = (state: ApplicationParamsState | undefined, incomingAction: Action): ApplicationParamsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_IS_MOBILE':
            return {
                isMobile: action.isMobile
            };
    }

    return state;
};
