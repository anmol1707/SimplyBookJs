import {HouseData} from "../DataInterfaces";
import ErrorWithStatusCode from "../ErrorWithStatusCode";
const HouseService = require("../service/HouseService");

export {};
let express = require('express');
let router = express.Router();

router.get("/get-house", async (req, res) => {
    if(req.query == null || req.query.id == null) {
        return res.status(400).json({message: "House id not found!"});
    }
    try {
        let houseData: HouseData = await HouseService.getHouse(req.query.id);
        return res.status(200).json({
            message: "Success!",
            result: houseData
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

router.post("/add-house", async (req, res) => {
    if (req.body == null || req.body.data == null) {
        return res.status(400).json({message: "Request data not found!"});
    }
    let houseData: HouseData = req.body.data;
    try {
        await HouseService.addHouse(houseData);
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
