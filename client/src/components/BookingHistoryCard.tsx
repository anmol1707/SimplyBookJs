import * as React from "react";
import {BookingHistoryData} from "../constants/DataInterfaces";
import {styled} from "@material-ui/core";
import {DetailContainer, DetailKey, DetailValue} from "./WebSharedComponents";
import {getPriceForTicket} from "../constants/nativeFunctions";

const Card = styled('div')({
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: 20,
    padding: 10,
    boxShadow: "0 10px 20px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 7
});

interface Props {
    bookingHistoryData: BookingHistoryData;
}

interface State {

}

export default class BookingHistoryCard extends React.Component<Props, State> {
    render() {
        let {bookingHistoryData} = this.props;
        let data: { key: string, value: string }[] = [{
            key: "Film Name:",
            value: bookingHistoryData.filmData.name
        }, {
            key: "Seat Number:",
            value: bookingHistoryData.bookingData.columnNumber.toString() + String.fromCharCode(64 + bookingHistoryData.bookingData.rowNumber)
        }, {
            key: "Genre:",
            value: bookingHistoryData.filmData.genre
        }, {
            key: "Duration:",
            value: bookingHistoryData.filmData.duration.toString() + " minutes"
        }, {
            key: "Language:",
            value: bookingHistoryData.filmData.language
        }, {
            key: "Movie starts at:",
            value: new Date(bookingHistoryData.broadcastData.date).toString().substring(0, 24)
        }, {
            key: "House:",
            value: bookingHistoryData.houseData.name
        }, {
            key: "Booking date:",
            value: new Date(bookingHistoryData.bookingData.date).toString().substring(0, 24)
        }, {
            key: "Price:",
            value: "$" + getPriceForTicket(bookingHistoryData.houseData.rowCount, bookingHistoryData.bookingData.rowNumber)
        }];

        return (
            <Card>
                {data.map((datum, index) => {
                    return (
                        <DetailContainer key={datum.key + "_count_" + index.toString()}>
                            <DetailKey>{datum.key}</DetailKey>
                            <DetailValue>{datum.value}</DetailValue>
                        </DetailContainer>
                    );
                })}
            </Card>
        );
    }
}
