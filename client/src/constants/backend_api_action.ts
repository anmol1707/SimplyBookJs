import axios, {AxiosResponse} from 'axios';
import {
    BookingData,
    BookingHistoryData,
    BroadcastData,
    BroadcastDataResult,
    FilmData,
    HouseData
} from "./DataInterfaces";
import {
    setAllFilms,
    setBookingHistoryForBroadcast,
    setBookingHistoryForUser,
    setBroadcastListByFilmId,
    setHouseData
} from "../redux/reducerAction";
import {createBroadcastsByFilmIdMap, mergeApiStringWithQueryObject} from "./backendActionsHelperFunctions";
import {StoredItem} from "./StoredItem";

let apiUrl: string = "http://localhost:3001/";

function getRequestHeader(): any {
    let headers: any = {};
    let token: string = localStorage.getItem(StoredItem.JWT_TOKEN);
    headers["authorization"] = "Bearer " + token;
    return headers;
}

export async function loginUser(emailId: string, password: string): Promise<any> {
    let API: string = apiUrl + "users/login";
    let payload: object = {
        emailId: emailId,
        password: password
    };
    try {
        let response: AxiosResponse = await axios.post(API, payload);
        let responseData: any = response.data;
        return responseData.token;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export async function loginWithJwt(token: string) {
    let API: string = apiUrl + "users/login-with-jwt";
    let payload: object = {
        token: token
    };
    try {
        let response: AxiosResponse = await axios.post(API, payload);
        let responseData: any = response.data;
        return responseData.token;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export async function registerUser(emailId: string, password: string, name: string) {
    let API: string = apiUrl + "users/register";
    let payload: object = {
        emailId: emailId,
        password: password,
        name: name
    };
    try {
        let response: AxiosResponse = await axios.post(API, payload);
        let responseData: any = response.data;
        return responseData.token;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export function getAllFilms() {
    return async function (dispatch, getState) {
        let API: string = apiUrl + "films/get-all-films";
        try {
            let response: AxiosResponse = await axios.get(API, {headers: getRequestHeader()});
            let filmList: FilmData[] = response.data.result;

            return dispatch(setAllFilms(filmList));
        } catch (error) {
            console.log(error);
            throw new Error(error.response.data.message);
        }
    }
}

export function getBroadcastListForFilms() {
    return async function (dispatch, getState) {
        let API: string = apiUrl + "broadcasts/get-broadcasts-for-films";
        try {
            let response: AxiosResponse = await axios.get(API, {headers: getRequestHeader()});
            let broadcastsByFilmId: BroadcastDataResult[] = response.data.result;
            let broadcastsMap: Map<string, BroadcastData[]> = createBroadcastsByFilmIdMap(broadcastsByFilmId);
            return dispatch(setBroadcastListByFilmId(broadcastsMap));
        } catch (error) {
            console.log(error);
            throw new Error(error.response.data.message);
        }
    }
}

export function getHouseDataById(houseId: string) {
    return async function (dispatch, getState) {
        let initialAPI: string = apiUrl + "houses/get-house";
        let queryVariables: any = {
            id: houseId
        };
        let API: string = mergeApiStringWithQueryObject(initialAPI, queryVariables);
        try {
            let response: AxiosResponse = await axios.get(API, {headers: getRequestHeader()});
            let houseData: HouseData = response.data.result;
            return dispatch(setHouseData(houseData));
        } catch (error) {
            console.log(error);
            throw new Error(error.response.data.message);
        }
    }
}

export function getBookingHistoryForBroadcast(broadcastData: BroadcastData) {
    return async function (dispatch, getState) {
        let initialAPI: string = apiUrl + "booking/get-bookings-for-broadcast";
        let queryVariables: any = {
            id: broadcastData._id
        };
        let API: string = mergeApiStringWithQueryObject(initialAPI, queryVariables);
        try {
            let response: AxiosResponse = await axios.get(API, {headers: getRequestHeader()});
            let bookingHistory: BookingData[] = response.data.result;
            return dispatch(setBookingHistoryForBroadcast(bookingHistory));
        } catch (error) {
            console.log(error);
            throw new Error(error.response.data.message);
        }
    }
}

export function bookTickets(bookings: BookingData[]) {
    return async function (dispatch, getState) {
        let API: string = apiUrl + "booking/add-bookings";
        let payload: object = {
            bookings: bookings
        };
        try {
            await axios.post(API, payload, {headers: getRequestHeader()});
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            throw new Error(error.response.data.message);
        }
    }
}

export function getBookingHistoryForUser() {
    return async function (dispatch, getState) {
        let API: string = apiUrl + "booking/get-bookings-for-user";
        try {
            let response: AxiosResponse = await axios.get(API, {headers: getRequestHeader()});
            let bookingHistory: BookingHistoryData[] = response.data.result;
            return dispatch(setBookingHistoryForUser(bookingHistory));
        } catch (error) {
            console.log(error);
            throw new Error(error.response.data.message);
        }
    }
}
