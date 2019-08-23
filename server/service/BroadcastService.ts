import {BroadcastData, BroadcastDataResult} from "../DataInterfaces";
import ErrorWithStatusCode from "../ErrorWithStatusCode";
const Broadcast = require('../model/Broadcast');

async function getBroadcastsForFilms(): Promise<BroadcastDataResult[]> {
    try {
        let resultByFilmId: BroadcastDataResult[] = await Broadcast.aggregate([
            { $group : { _id: "$filmId", broadcasts: { $push: "$$ROOT" } } }
        ]);
        return resultByFilmId;
    } catch (error) {
        throw new ErrorWithStatusCode("Error reading broadcast data from db", 500);
    }
}

async function addBroadcast(broadcastData: BroadcastData): Promise<void> {
    try {
        let newBroadcast = new Broadcast({
            filmId: broadcastData.filmId,
            houseId: broadcastData.houseId,
            date: broadcastData.date,
        });
        await newBroadcast.save();
    } catch (error) {
        throw new ErrorWithStatusCode("Error saving new broadcast to db", 500);
    }
}

async function getBroadcastById(broadcastId: string): Promise<BroadcastData> {
    try {
        let broadcastData: BroadcastData = await Broadcast.findById(broadcastId);
        return broadcastData;
    } catch (error) {
        throw new ErrorWithStatusCode("Error reading broadcast data from db", 500);
    }
}

module.exports = {
    addBroadcast: addBroadcast,
    getBroadcastsForFilms: getBroadcastsForFilms,
    getBroadcastById: getBroadcastById
};
