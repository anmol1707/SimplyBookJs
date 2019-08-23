import * as React from "react";
import {BookingData} from "../constants/DataInterfaces";
import {checkIfRowColumnCombinationPresentInBookingArray} from "../constants/nativeFunctions";
import {styled} from "@material-ui/core/styles";
import {nativeColors} from "../constants/colors";
import {Button} from "@material-ui/core";

const Seat = styled(Button)({
    width: 40,
    height: 40,
    minWidth: 40,
    minHeight: 40,
    margin: 10,
    backgroundColor: nativeColors.primaryGreen,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    userSelect: "none"
});

interface Props {
    rowNumber: number;
    columnNumber: number;
    bookingHistory: BookingData[];
    selectedBookings: BookingData[];

    onSeatClick: (indexInList: number, newBookingData: BookingData) => void;
}

interface State {
    indexInBookingHistory: number;
    indexInSelectedBookings: number;
}

export default class SeatComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            indexInBookingHistory: null,
            indexInSelectedBookings: null
        };

        this.updateStateFromProps = this.updateStateFromProps.bind(this);
        this.onSeatClick = this.onSeatClick.bind(this);
    }

    componentDidMount(): void {
        this.updateStateFromProps();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (prevProps.bookingHistory.length !== this.props.bookingHistory.length || prevProps.selectedBookings.length !== this.props.selectedBookings.length) {
            this.updateStateFromProps();
        }
    }

    render() {
        return (
            <Seat variant="contained" size="small" color="primary" key={this.props.rowNumber + "row" + this.props.columnNumber + "column"}
                    style={this.state.indexInSelectedBookings !== null
                        ? {backgroundColor: "blue"}
                        : this.state.indexInBookingHistory !== null
                            ? {backgroundColor: "red"}
                            : {}}
                    onClick={this.onSeatClick}>
                {this.props.columnNumber.toString() + String.fromCharCode(64 + this.props.rowNumber)}
            </Seat>
        );
    }

    updateStateFromProps() {
        let {bookingHistory, selectedBookings, rowNumber, columnNumber} = this.props;
        let indexInBookingHistory: number = checkIfRowColumnCombinationPresentInBookingArray(bookingHistory, rowNumber, columnNumber);
        let indexInSelectedBookings: number = checkIfRowColumnCombinationPresentInBookingArray(selectedBookings, rowNumber, columnNumber);
        this.setState({
            indexInBookingHistory: indexInBookingHistory,
            indexInSelectedBookings: indexInSelectedBookings
        });
    }

    onSeatClick() {
        let {indexInSelectedBookings, indexInBookingHistory} = this.state;
        let {rowNumber, columnNumber} = this.props;
        if(indexInBookingHistory != null) {
            return;
        }

        if (indexInSelectedBookings == null) {
            let newBookingData: BookingData = {
                broadcastId: null,
                rowNumber: rowNumber,
                columnNumber: columnNumber,
                date: null
            };
            this.props.onSeatClick(null, newBookingData);
        } else {
            this.props.onSeatClick(indexInSelectedBookings, null);
        }
    }
}
