import * as React from "react";
import {BookingData, HouseData} from "../constants/DataInterfaces";
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
    bookingData: BookingData;
    houseData: HouseData;
}

interface State {

}

export default class BookingSelectedCard extends React.Component<Props, State> {
    render() {
        let {bookingData, houseData} = this.props;
        let data: { key: string, value: string }[] = [{
            key: "Seat Number:",
            value: bookingData.columnNumber.toString() + String.fromCharCode(64 + bookingData.rowNumber)
        }, {
            key: "Price:",
            value: "$" + getPriceForTicket(bookingData.rowNumber, houseData.rowCount).toString()
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
