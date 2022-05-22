// import * as abc from "../../types/player"
import { ITrack } from "../../types/tracks";

export interface PlayerState {
    active: null | ITrack,
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}

enum PlayerActionTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME"
}

interface PlayAction {
    type: PlayerActionTypes.PLAY
}

interface PauseAction {
    type: PlayerActionTypes.PAUSE
}

interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE,
    payload: ITrack;
}

interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION,
    payload: number;
}

interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME,
    payload: number;
}

interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME,
    payload: number
}

type PlayerAction =
    PlayAction
    | PauseAction
    | SetActiveAction
    | SetDurationAction
    | SetVolumeAction
    | SetCurrentTimeAction




const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true

}


export const playerReducer = (state = initialState, action: PlayerAction): PlayerState => {
    switch (action.type) {
        case PlayerActionTypes.PAUSE:
            return { ...state, pause: true }
        case PlayerActionTypes.PLAY:
            return { ...state, pause: false }

        case PlayerActionTypes.SET_CURRENT_TIME:
            return { ...state, currentTime: action.payload }

        case PlayerActionTypes.SET_VOLUME:
            return { ...state, volume: action.payload }

        case PlayerActionTypes.SET_DURATION:
            return { ...state, duration: action.payload }

        case PlayerActionTypes.SET_ACTIVE:
            return { ...state, active: action.payload, duration: 0, currentTime: 0 }
        default:
            return state

    }
}