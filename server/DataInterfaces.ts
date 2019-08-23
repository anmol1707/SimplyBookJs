export interface ServiceResponse {
    statusCode: number;
    data: any;
}

export interface FilmData {
    _id: string;
    name: string;
    duration: number;
    genre: string;
    language: string;
    description: string;
}

export interface BroadcastData {
    _id: string;
    filmId: string;
    houseId: string;
    date: Date;
}

export interface HouseData {
    _id: string;
    rowCount: number;
    columnCount: number;
    name: string;
}

export interface BroadcastDataResult {
    _id: string;
    broadcasts: BroadcastData[];
}

export interface BookingData {
    userId: string;
    broadcastId: string;
    rowNumber: number;
    columnNumber: number;
    date: Date;
}

export interface BookingHistoryData {
    bookingData: BookingData;
    filmData: FilmData;
    houseData: HouseData;
    broadcastData: BroadcastData;
}
