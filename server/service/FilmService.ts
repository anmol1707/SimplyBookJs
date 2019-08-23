import {FilmData} from "../DataInterfaces";
import ErrorWithStatusCode from "../ErrorWithStatusCode";
const Film = require('../model/Film');

async function getFilmById(id: string): Promise<FilmData> {
    try {
        let filmData: FilmData = await Film.findById(id);
        if(filmData == null) {
            throw new Error("Film Id does not exist!");
        }
        return filmData;
    } catch (error) {
        throw new ErrorWithStatusCode("Error reading film data from db", 500);
    }
}

async function getAllFilms(): Promise<FilmData[]> {
    try {
        let filmList: FilmData[] = await Film.find({});
        return filmList;
    } catch (error) {
        throw new ErrorWithStatusCode("Error reading film data from db", 500);
    }
}

async function addFilm(filmData: FilmData): Promise<void> {
    try {
        let newFilm = new Film({
            name: filmData.name,
            duration: filmData.duration,
            genre: filmData.genre,
            language: filmData.language,
            description: filmData.description
        });
        await newFilm.save();
    } catch (error) {
        throw new ErrorWithStatusCode("Error saving new film to db", 500);
    }
}

module.exports = {
    getAllFilms: getAllFilms,
    getFilmById: getFilmById,
    addFilm: addFilm
};
