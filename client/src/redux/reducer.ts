import {ReducerState} from "../constants/DataInterfaces";
import {
    SET_ALL_FILMS,
    SET_BOOKING_HISTORY_FOR_BROADCAST,
    SET_BOOKING_HISTORY_FOR_USER,
    SET_BROADCAST_LIST_BY_FILM_ID,
    SET_HOUSE_DATA,
    SET_SELECTED_BROADCAST_DATA
} from "./reducerAction";


const initialState: ReducerState = {
    allFilms: [],
    broadcastListByFilmId: new Map(),
    bookingHistoryForBroadcast: [],
    houseData: null,
    selectedBroadcastData: null,
    bookingHistoryForUser: []
};

export default function reducer(state = initialState, action: { type: string; payload: any }) {
    switch (action.type) {
        case SET_ALL_FILMS:
            return {
                ...state,
                allFilms: action.payload
            };
        case SET_BROADCAST_LIST_BY_FILM_ID:
            return {
                ...state,
                broadcastListByFilmId: action.payload
            };
        case SET_HOUSE_DATA:
            return {
                ...state,
                houseData: action.payload
            };
        case SET_BOOKING_HISTORY_FOR_BROADCAST:
            return {
                ...state,
                bookingHistoryForBroadcast: action.payload
            };
        case SET_SELECTED_BROADCAST_DATA:
            return {
                ...state,
                selectedBroadcastData: action.payload
            };
        case SET_BOOKING_HISTORY_FOR_USER:
            return {
                ...state,
                bookingHistoryForUser: action.payload
            };
        default:
            return {
                ...state
            };
    }
};
