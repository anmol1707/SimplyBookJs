import {BookingData, BookingHistoryData} from "../DataInterfaces";
import ErrorWithStatusCode from "../ErrorWithStatusCode";
const BookingService = require("../service/BookingService");
const HelperService = require("../service/HelperService");

export {};
let express = require('express');
let router = express.Router();

router.post("/add-bookings", async (req, res) => {
    if (req.body == null || req.body.bookings == null) {
        return res.status(400).json({message: "Request data not found!"});
    }
    try {
        let bookings: BookingData[] = req.body.bookings;
        let jwtToken: string = HelperService.getJwtTokenFromRequest(req);
        await BookingService.addBooking(bookings, jwtToken);
        return res.status(200).json({
            message: "Success!"
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

router.get("/get-bookings-for-broadcast", async (req, res) => {
    if(req.query == null || req.query.id == null) {
        return res.status(400).json({message: "Broadcast id not found!"});
    }
    try {
        let bookingHistory: BookingData[] = await BookingService.getBookingsForBroadcast(req.query.id);
        return res.status(200).json({
            message: "Success!",
            result: bookingHistory
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

router.get("/get-bookings-for-user", async (req, res) => {
    try {
        let jwtToken: string = HelperService.getJwtTokenFromRequest(req);
        let bookingHistory: BookingHistoryData[] = await BookingService.getBookingsForUser(jwtToken);
        return res.status(200).json({
            message: "Success!",
            result: bookingHistory
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

router.delete("/delete-all-bookings", async (req, res) => {
    try {
        await BookingService.clearAllBookings();
        return res.status(200).json({
            message: "Success!"
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

module.exports = router;
