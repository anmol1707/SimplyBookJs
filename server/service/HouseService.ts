import {HouseData} from "../DataInterfaces";
import ErrorWithStatusCode from "../ErrorWithStatusCode";
const House = require('../model/House');

async function getHouse(id: string): Promise<HouseData> {
    try {
        let houseData: HouseData = await House.findById(id);
        return houseData;
    } catch (error) {
        throw new ErrorWithStatusCode("Error retrieving house data from db", 500);
    }
}

async function addHouse(houseData: HouseData): Promise<void> {
    try {
        let newHouse = new House({
            rowCount: houseData.rowCount,
            columnCount: houseData.columnCount,
            name: houseData.name
        });
        await newHouse.save();
    } catch (error) {
        throw new ErrorWithStatusCode("Error saving new house to db", 500);
    }
}

module.exports = {
    getHouse: getHouse,
    addHouse: addHouse,
};
