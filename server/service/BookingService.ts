import {BookingData, BookingHistoryData, BroadcastData, FilmData, HouseData, ServiceResponse} from "../DataInterfaces";
import ErrorWithStatusCode from "../ErrorWithStatusCode";

const Booking = require('../model/Booking');
const UserService = require("./UserService");
const FilmService = require("./FilmService");
const BroadcastService = require("./BroadcastService");
const HouseService = require("./HouseService");

async function addBooking(bookings: BookingData[], jwtToken: string): Promise<void> {
    let errorWhileSaving = null;
    let userId: string = null;
    try {
        let serviceResponse: ServiceResponse = await UserService.getUser(jwtToken);
        userId = serviceResponse.data.user._id;
    } catch (error) {
        throw new ErrorWithStatusCode("Error saving new booking to db", 500);
    }
    await Promise.all(bookings.map(async (bookingData: BookingData) => {
        try {
            let newBooking = new Booking({
                userId: userId,
                broadcastId: bookingData.broadcastId,
                rowNumber: bookingData.rowNumber,
                columnNumber: bookingData.columnNumber,
                date: bookingData.date
            });
            await newBooking.save();
        } catch (error) {
            errorWhileSaving = error;
        }
    }));
    if (errorWhileSaving != null) {
        await Promise.all(bookings.map(async (bookingData: BookingData) => {
            await Booking.find({rowNumber: bookingData.rowNumber, columnNumber: bookingData.columnNumber}).remove();
        }));
        throw new ErrorWithStatusCode("Error saving new booking to db", 500);
    }
}

async function getBookingsForBroadcast(broadcastId: string): Promise<BookingData[]> {
    try {
        let bookingHistory: BookingData[] = await Booking.find({broadcastId: broadcastId});
        return bookingHistory;
    } catch (error) {
        throw new ErrorWithStatusCode("Error reading booking history from db", 500);
    }
}

async function getBookingsForUser(jwtToken: string): Promise<BookingHistoryData[]> {
    let userId: string = null;
    try {
        let serviceResponse: ServiceResponse = await UserService.getUser(jwtToken);
        userId = serviceResponse.data.user._id;
    } catch (error) {
        throw new ErrorWithStatusCode("Error retrieving booking history from db", 500);
    }
    try {
        let bookingData: BookingData[] = await Booking.find({userId: userId});
        let bookingHistoryData: BookingHistoryData[] = [];
        let err = null;
        await Promise.all(bookingData.map(async (booking: BookingData) => {
            try {
                let broadcastData: BroadcastData = await BroadcastService.getBroadcastById(booking.broadcastId);
                let filmData: FilmData = await FilmService.getFilmById(broadcastData.filmId);
                let houseData: HouseData = await HouseService.getHouse(broadcastData.houseId);
                let bookingHistory: BookingHistoryData = {
                    bookingData: booking,
                    filmData: filmData,
                    houseData: houseData,
                    broadcastData: broadcastData
                };
                bookingHistoryData.push(bookingHistory);
            } catch (error) {
                err = error;
            }
        }));
        if(err != null) {
            throw new Error(err);
        }
        return bookingHistoryData;
    } catch (error) {
        throw new ErrorWithStatusCode("Error reading booking history from db", 500);
    }
}

async function clearAllBookings() {
    try {
        let bookingHistory: BookingData[] = await Booking.deleteMany({});
        return bookingHistory;
    } catch (error) {
        throw new ErrorWithStatusCode("Error deleting booking history from db", 500);
    }
}

module.exports = {
    addBooking: addBooking,
    getBookingsForBroadcast: getBookingsForBroadcast,
    getBookingsForUser: getBookingsForUser,
    clearAllBookings: clearAllBookings
};
