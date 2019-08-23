import * as React from "react";
import {withRouter} from "react-router-dom";
import {BookingData, BroadcastData, HouseData} from "../constants/DataInterfaces";
import {styled} from '@material-ui/core/styles';
import {Box, Typography} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import SeatComponent from "../components/SeatComponent";
import {connect} from "react-redux";
import InternalNavBar from "../components/InternalNavBar";
import {responsiveFontSizeTheme} from "../constants/nativeFunctions";
import SelectedSeatsDisplayComponent from "../components/SelectedSeatsDisplayComponent";
import {bookTickets, getBookingHistoryForBroadcast, getHouseDataById} from "../constants/backend_api_action";
import LoadingComponent from "../components/LoadingComponent";
import {nativeColors} from "../constants/colors";

const Container = styled('div')({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    overflow: "scroll"
});

const SeatsContainer = styled('div')({
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
});

const SeatsRow = styled('div')({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
});

interface Props {
    history: any;

    houseData: HouseData;
    bookingHistoryForBroadcast: BookingData[];
    selectedBroadcastData: BroadcastData;

    bookTickets: (bookings: BookingData[]) => Promise<boolean>;
    getHouseDataById: (houseId: string) => Promise<any>;
    getBookingHistoryForBroadcast: (broadcastData: BroadcastData) => Promise<any>;
}

interface State {
    loading: boolean;
    selectedBookings: BookingData[];
}

class SelectSeat extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedBookings: []
        };

        this.getSeatsToRender = this.getSeatsToRender.bind(this);
        this.onSeatClick = this.onSeatClick.bind(this);
        this.onBookTickets = this.onBookTickets.bind(this);
    }

    async componentDidMount(): Promise<void> {
        let {selectedBroadcastData} = this.props;
        if (selectedBroadcastData == null) {
            this.props.history.goBack();
            return;
        }

        try {
            await Promise.all([
                this.props.getHouseDataById(selectedBroadcastData.houseId),
                this.props.getBookingHistoryForBroadcast(selectedBroadcastData)
            ]);

            await this.setState({
                loading: false
            });
        } catch (error) {
            alert(error.message);
        }
    }

    getSeatsToRender(): JSX.Element[] {
        let {houseData, bookingHistoryForBroadcast} = this.props;
        let {selectedBookings} = this.state;
        let rowsToRender: JSX.Element[] = [];
        for (let i = 1; i <= houseData.rowCount; i++) {
            let seats: JSX.Element[] = [];
            for (let j = 1; j <= houseData.columnCount; j++) {
                seats.push(
                    <SeatComponent rowNumber={i}
                                   key={i + "row" + j + "column_component"}
                                   columnNumber={j}
                                   bookingHistory={bookingHistoryForBroadcast}
                                   selectedBookings={selectedBookings}
                                   onSeatClick={this.onSeatClick}/>
                );
            }
            rowsToRender.push(
                <SeatsRow key={i + "row_component"}>
                    {seats.map((seat) => seat)}
                </SeatsRow>
            );
        }
        return rowsToRender;
    }

    render() {
        if (this.state.loading) {
            return <LoadingComponent/>
        }
        return (
            <Container>
                <InternalNavBar/>
                <ThemeProvider theme={responsiveFontSizeTheme}>
                    <Typography style={{marginBottom: 30, marginTop: 30, textAlign: "center"}} variant="h4">
                        Select a seat according to your preference
                    </Typography>
                    <SeatsContainer>
                        {this.getSeatsToRender()}
                        <Box
                            boxShadow={3}
                            m={1}
                            p={1}
                            style={{width: "80%", height: 30, backgroundColor: nativeColors.blue}}>
                            <Typography style={{textAlign: "center", color: "white"}} variant="h6">
                                Screen
                            </Typography>
                        </Box>
                    </SeatsContainer>
                </ThemeProvider>
                <SelectedSeatsDisplayComponent selectedBooking={this.state.selectedBookings}
                                               houseData={this.props.houseData}
                                               bookTickets={this.onBookTickets}/>
            </Container>
        );
    }

    onSeatClick(indexInList: number, newBookingData: BookingData) {
        let {selectedBookings} = this.state;
        let tempArray: BookingData[] = new Array(...selectedBookings);
        if (indexInList != null) {
            tempArray.splice(indexInList, 1);
        } else {
            tempArray.push(newBookingData);
        }
        this.setState({
            selectedBookings: tempArray
        });
    }

    async onBookTickets() {
        let {selectedBookings} = this.state;

        selectedBookings = selectedBookings.map((booking): BookingData => {
            return {
                ...booking,
                broadcastId: this.props.selectedBroadcastData._id,
                date: new Date()
            };
        });

        if (window.confirm("Are you sure you want to purchase the tickets? Your payment will not be refunded!")) {
            try {
                await this.props.bookTickets(selectedBookings);
                this.props.history.push("/booking-history/");
            } catch (error) {
                alert(error.message);
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        houseData: state.reducer.houseData,
        bookingHistoryForBroadcast: state.reducer.bookingHistoryForBroadcast,
        selectedBroadcastData: state.reducer.selectedBroadcastData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        bookTickets: (bookings: BookingData[]) => {
            return dispatch(bookTickets(bookings));
        },
        getHouseDataById: (houseId: string) => {
            return dispatch(getHouseDataById(houseId));
        },
        getBookingHistoryForBroadcast: (broadcastData: BroadcastData) => {
            return dispatch(getBookingHistoryForBroadcast(broadcastData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectSeat));
