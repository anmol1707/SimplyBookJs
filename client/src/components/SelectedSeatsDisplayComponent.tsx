import * as React from "react";
import {BookingData, HouseData} from "../constants/DataInterfaces";
import {ThemeProvider} from "@material-ui/styles";
import {getPriceForTicket, responsiveFontSizeTheme} from "../constants/nativeFunctions";
import {Button, Typography} from "@material-ui/core";
import BookingSelectedCard from "./BookingSelectedCard";

interface Props {
    selectedBooking: BookingData[];
    houseData: HouseData;

    bookTickets: () => void;
}

interface State {
}

export default class SelectedSeatsDisplayComponent extends React.Component<Props, State> {
    buttonRef;

    constructor(props) {
        super(props);

        this.buttonRef = React.createRef();
        this.getTotalCost = this.getTotalCost.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if(prevProps.selectedBooking.length === 0 && this.props.selectedBooking.length === 1) {
            this.buttonRef.scrollIntoView({behavior: 'smooth'})
        }
    }

    render() {
        let {selectedBooking, houseData} = this.props;
        if (selectedBooking == null || selectedBooking.length === 0) {
            return null;
        } else {
            return (
                <ThemeProvider theme={responsiveFontSizeTheme}>
                    <Typography style={{marginTop: 30}} variant="h5">
                        Selected Seats
                    </Typography>
                    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
                        {selectedBooking.map((booking: BookingData) => {
                            return <BookingSelectedCard houseData={houseData} bookingData={booking}/>
                        })}
                    </div>
                    <Typography style={{margin: 30}} variant="h6">
                        Total Cost: $ {this.getTotalCost()}
                    </Typography>
                    <Button
                        ref={(ref) => this.buttonRef = ref}
                        onClick={this.props.bookTickets}
                        style={{marginTop: 20, marginBottom: 100}}
                        variant="contained"
                        color="primary">
                        Book Ticket(s)
                    </Button>
                </ThemeProvider>
            );
        }
    }

    getTotalCost(): number {
        let {selectedBooking, houseData} = this.props;
        let totalCost: number = 0;
        selectedBooking.map((booking: BookingData) => {
            totalCost += getPriceForTicket(houseData.rowCount, booking.rowNumber);
        });
        return totalCost;
    }
}
