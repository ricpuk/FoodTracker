import { Action, Reducer } from 'redux';
import API from '../utils/api';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SoundTracksState {
    isLoading: boolean;
    page?: number;
    soundTracks: SoundTrack[];
}

export interface SoundTrack {
    id: number;
    translations: SoundTrackTranslation[];
}

export interface SoundTrackTranslation {
    languageCode: LanguageCode
    source: Resource
}

export interface Resource {
    id: number,
    path: string,
    name: string
}

export enum LanguageCode {
    LT,
    EN
}


const RESOURCE_URL = 'api/soundtracks'

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestSoundTracksAction {
    type: 'REQUEST_SOUNDTRACKS';
    page: number;
}

interface ReceiveSoundTracksAction {
    type: 'RECEIVE_SOUNDTRACKS';
    page: number;
    soundTracks: SoundTrack[];
}

interface SoundTrackResponse {
    items: SoundTrack[]
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestSoundTracksAction | ReceiveSoundTracksAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestSoundTracks: (page: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.soundTracks && page !== appState.soundTracks.page) {
            API.get<SoundTrackResponse>(RESOURCE_URL) 
                .then(response => {
                    const {data} = response;
                    dispatch({ type: 'RECEIVE_SOUNDTRACKS', page: page, soundTracks: data.items });
                });
            dispatch({ type: 'REQUEST_SOUNDTRACKS', page: page });
            
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SoundTracksState = { soundTracks: [], isLoading: false};

export const reducer: Reducer<SoundTracksState> = (state: SoundTracksState | undefined, incomingAction: Action): SoundTracksState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_SOUNDTRACKS':
            return {
                soundTracks: state.soundTracks,
                page: state.page,
                isLoading: true,

            };
        case 'RECEIVE_SOUNDTRACKS':
            if (action.page === state.page || action.page === 0) {
                return {
                    soundTracks: action.soundTracks,
                    page: action.page,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
