import {BroadcastData, BroadcastDataResult} from "../DataInterfaces";
import ErrorWithStatusCode from "../ErrorWithStatusCode";
const BroadcastService = require("../service/BroadcastService");

export {};
let express = require('express');
let router = express.Router();

router.get("/get-broadcasts-for-films", async (req, res) => {
    try {
        let broadcastsByFilmId: BroadcastDataResult[] = await BroadcastService.getBroadcastsForFilms();
        return res.status(200).json({
            message: "Success!",
            result: broadcastsByFilmId
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

router.post("/add-broadcast", async (req, res) => {
    if (req.body == null || req.body.data == null) {
        return res.status(400).json({message: "Request data not found!"});
    }
    let broadcastData: BroadcastData = req.body.data;
    try {
        await BroadcastService.addBroadcast(broadcastData);
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
