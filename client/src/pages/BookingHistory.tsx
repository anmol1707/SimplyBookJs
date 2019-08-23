import * as React from "react";
import {getBookingHistoryForUser} from "../constants/backend_api_action";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import InternalNavBar from "../components/InternalNavBar";
import {BookingHistoryData} from "../constants/DataInterfaces";
import {styled, Typography} from "@material-ui/core";
import BookingHistoryCard from "../components/BookingHistoryCard";
import {responsiveFontSizeTheme} from "../constants/nativeFunctions";
import {ThemeProvider} from "@material-ui/styles";
import ProtectedPage from "../components/ProtectedPage";

const CardContainer = styled('div')({
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%"
});

interface Props {
    bookingHistoryForUser: BookingHistoryData[];
    getBookingHistoryForUser: () => Promise<any>;
    history: any;
}

interface State {
    loading: boolean;
}

class BookingHistory extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        this.getDataFromBackend = this.getDataFromBackend.bind(this);
    }

    async getDataFromBackend() {
        try {
            await this.props.getBookingHistoryForUser();
            this.setState({
                loading: false
            });
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        let {history} = this.props;
        return (
            <ProtectedPage history={history} functionToCallAfterAuthCheck={this.getDataFromBackend}>
                {!this.state.loading &&
                <div style={{display: "flex", flexDirection: "column"}}>
                    <InternalNavBar/>
                    <ThemeProvider theme={responsiveFontSizeTheme}>
                        <Typography style={{marginBottom: 30, marginTop: 30, textAlign: "center"}} variant="h4">
                            These are the tickets you have booked with us so far!
                        </Typography>
                    </ThemeProvider>
                    <CardContainer>
                        {this.props.bookingHistoryForUser.map((bookingHistoryData: BookingHistoryData) => {
                            return <BookingHistoryCard key={bookingHistoryData.bookingData._id}
                                                       bookingHistoryData={bookingHistoryData}/>
                        })}
                    </CardContainer>
                </div>}
            </ProtectedPage>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bookingHistoryForUser: state.reducer.bookingHistoryForUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBookingHistoryForUser: () => {
            return dispatch(getBookingHistoryForUser());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookingHistory));
