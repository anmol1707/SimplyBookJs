import {BroadcastData, BroadcastDataResult} from "./DataInterfaces";

export function createBroadcastsByFilmIdMap(broadcastsByFilmId: BroadcastDataResult[]): Map<string, BroadcastData[]> {
    let broadcastsMap: Map<string, BroadcastData[]> = new Map();
    broadcastsByFilmId.map((broadcastDataResult: BroadcastDataResult) => {
        broadcastsMap.set(broadcastDataResult._id, broadcastDataResult.broadcasts);
    });
    return broadcastsMap;
}

export function mergeApiStringWithQueryObject(API: string, queryVariables: any): string {
    API += "?";
    for (let key in queryVariables) {
        API += key + "=";
        API += queryVariables[key] + "&"
    }
    API = API.substring(0, API.length - 1);
    return API;
}
