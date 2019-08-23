import {BookingData, BookingHistoryData, BroadcastData, FilmData, HouseData} from "../constants/DataInterfaces";

export const SET_ALL_FILMS: string = "SET_ALL_FILMS";
export const SET_BROADCAST_LIST_BY_FILM_ID: string = "SET_BROADCAST_LIST_BY_FILM_ID";
export const SET_HOUSE_DATA: string = "SET_HOUSE_DATA";
export const SET_BOOKING_HISTORY_FOR_BROADCAST: string = "SET_BOOKING_HISTORY_FOR_BROADCAST";
export const SET_SELECTED_BROADCAST_DATA: string = "SET_SELECTED_BROADCAST_DATA";
export const SET_BOOKING_HISTORY_FOR_USER: string = "SET_BOOKING_HISTORY_FOR_USER";

export function setAllFilms(allFilms: FilmData[]) {
    return {type: SET_ALL_FILMS, payload: allFilms};
}

export function setBroadcastListByFilmId(broadcastListByFilmId: Map<string, BroadcastData[]>) {
    return {type: SET_BROADCAST_LIST_BY_FILM_ID, payload: broadcastListByFilmId};
}

export function setHouseData(houseData: HouseData) {
    return {type: SET_HOUSE_DATA, payload: houseData};
}

export function setBookingHistoryForBroadcast(bookingHistory: BookingData[]) {
    return {type: SET_BOOKING_HISTORY_FOR_BROADCAST, payload: bookingHistory};
}

export function setSelectedBroadcastData(broadcastData: BroadcastData) {
    return {type: SET_SELECTED_BROADCAST_DATA, payload: broadcastData};
}

export function setBookingHistoryForUser(bookingHistory: BookingHistoryData[]) {
    return {type: SET_BOOKING_HISTORY_FOR_USER, payload: bookingHistory};
}
