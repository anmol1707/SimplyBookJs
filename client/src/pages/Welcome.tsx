import * as React from "react";
import InternalNavBar from "../components/InternalNavBar";
import {getAllFilms, getBroadcastListForFilms} from "../constants/backend_api_action";
import {connect} from "react-redux";
import {BroadcastData, FilmData} from "../constants/DataInterfaces";
import FilmCard from "../components/FilmCard";
import {withRouter} from "react-router-dom";
import {styled} from "@material-ui/core/styles";
import {setSelectedBroadcastData} from "../redux/reducerAction";
import ProtectedPage from "../components/ProtectedPage";

const CardContainer = styled('div')({
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%"
});

interface Props {
    history: any;

    allFilms: FilmData[];
    broadcastListByFilmId: Map<string, BroadcastData[]>;

    getAllFilms: () => Promise<any>;
    getBroadcastListForFilms: () => Promise<any>;
    setSelectedBroadcastData: (broadcastData: BroadcastData) => Promise<any>;
}

interface State {
    loading: boolean;
}

class Welcome extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        this.onSubmitPress = this.onSubmitPress.bind(this);
        this.getDataFromBackend = this.getDataFromBackend.bind(this);
    }

    async getDataFromBackend() {
        try {
            await Promise.all([
                this.props.getAllFilms(),
                this.props.getBroadcastListForFilms()
            ]);
            this.setState({
                loading: false
            });
        } catch (error) {
            alert(error.message);
        }
    }

    async onSubmitPress(broadcastData: BroadcastData) {
        try {
            await this.props.setSelectedBroadcastData(broadcastData);
            this.props.history.push("/select-seat/");
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        let {allFilms, history, broadcastListByFilmId} = this.props;
        return (
            <ProtectedPage history={history} functionToCallAfterAuthCheck={this.getDataFromBackend}>
                {!this.state.loading &&
                <div style={{display: "flex", flexDirection: "column"}}>
                    <InternalNavBar/>
                    <CardContainer>
                        {allFilms.map((filmData: FilmData) => {
                            return (
                                <FilmCard broadcastList={broadcastListByFilmId.get(filmData._id)}
                                          key={filmData._id}
                                          history={history}
                                          onSubmitPress={this.onSubmitPress}
                                          filmData={filmData}/>
                            );
                        })}
                    </CardContainer>
                </div>}
            </ProtectedPage>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allFilms: state.reducer.allFilms,
        broadcastListByFilmId: state.reducer.broadcastListByFilmId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllFilms: () => {
            return dispatch(getAllFilms());
        },
        getBroadcastListForFilms: () => {
            return dispatch(getBroadcastListForFilms());
        },
        setSelectedBroadcastData: (broadcastData: BroadcastData) => {
            return dispatch(setSelectedBroadcastData(broadcastData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Welcome));
