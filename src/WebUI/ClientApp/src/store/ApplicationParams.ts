import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ScreenSize } from '../utils/screenSize';
import * as ScreenUtils from '../utils/ScreenUtils'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ApplicationParamsState {
    isMobile: boolean,
    screenSize: ScreenSize
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetIsMobileAction {
    type: 'SET_IS_MOBILE';
    isMobile: boolean
}

interface SetScreenSize {
    type: 'SET_SCREEN_SIZE';
    screenSize: ScreenSize
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetIsMobileAction | SetScreenSize;

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
    },
    setScreenSize: (screenSize: ScreenSize): AppThunkAction<KnownAction> => (dispatch, getState) => { 
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.application && screenSize !== appState.application.screenSize) {
            dispatch({ type: 'SET_SCREEN_SIZE', screenSize: screenSize });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const {isMobile, screenSize} = ScreenUtils.getScreenParams();
const unloadedState: ApplicationParamsState = { isMobile: isMobile, screenSize: screenSize };

export const reducer: Reducer<ApplicationParamsState> = (state: ApplicationParamsState | undefined, incomingAction: Action): ApplicationParamsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_IS_MOBILE':
            return {
                ...state,
                isMobile: action.isMobile
            };
        case 'SET_SCREEN_SIZE':
            return {
                ...state,
                screenSize: action.screenSize
            };
    }

    return state;
};
