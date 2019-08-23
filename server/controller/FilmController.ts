import {FilmData} from "../DataInterfaces";
import ErrorWithStatusCode from "../ErrorWithStatusCode";

export {};
let express = require('express');
let router = express.Router();
const FilmService = require("../service/FilmService");

router.post("/add-film", async (req, res) => {
    if (req.body == null || req.body.data == null) {
        return res.status(400).json({message: "Request data not found!"});
    }
    let filmData: FilmData = req.body.data;
    try {
        await FilmService.addFilm(filmData);
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

router.get("/get-all-films", async (req, res) => {
    try {
        let filmList: FilmData[] = await FilmService.getAllFilms();
        return res.status(200).json({
            message: "Success!",
            result: filmList
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

module.exports = router;
