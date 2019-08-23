import * as React from "react";
import {BroadcastData, FilmData} from "../constants/DataInterfaces";
import {Button, FormControl, MenuItem, Select} from "@material-ui/core";
import {styled} from "@material-ui/core/styles";

const Card = styled('div')({
    display: "flex",
    width: 300,
    margin: 20,
    padding: 10,
    boxShadow: "0 10px 20px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 7,
});

const MainContainer = styled('div')({
    display: "flex",
    flexDirection: "column",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
});

const DetailsContainer = styled('div')({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center"
});

const DetailsContainerWithTopBorder = styled(DetailsContainer)({
    marginTop: 20,
    paddingTop: 15,
    borderTop: "1px solid rgba(0,0,0,0.2)"
});

const Image = styled('img')({
    height: 300,
    width: "100%",
    marginBottom: 10
});

const Value = styled('span')({
    maxWidth: "55%",
    minWidth: "55%",
    margin: 5
});

const Key = styled('span')({
    minWidth: "35%",
    maxWidth: "35%",
    margin: 5
});

interface Props {
    broadcastList: BroadcastData[];
    filmData: FilmData;
    history: any;

    onSubmitPress: (broadcastData: BroadcastData) => void;
}

interface State {
    broadcastIndex: number;
}

export default class FilmCard extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            broadcastIndex: null
        };
    }

    render() {
        let {filmData, broadcastList} = this.props;
        let {broadcastIndex} = this.state;
        return (
            <Card onClick={() => {

            }}>
                <MainContainer>
                    <Image alt={filmData._id} src={"../images/" + filmData._id + ".jpg"}/>
                    <DetailsContainer>
                        <Key>Name:</Key>
                        <Value>{filmData.name}</Value>
                    </DetailsContainer>
                    <DetailsContainer>
                        <Key>Description:</Key>
                        <Value>{filmData.description}</Value>
                    </DetailsContainer>
                    <DetailsContainer>
                        <Key>Language:</Key>
                        <Value>{filmData.language}</Value>
                    </DetailsContainer>
                    <DetailsContainer>
                        <Key>Genre:</Key>
                        <Value>{filmData.genre}</Value>
                    </DetailsContainer>
                    <DetailsContainer>
                        <Key>Duration:</Key>
                        <Value>{filmData.duration} minutes</Value>
                    </DetailsContainer>
                    <DetailsContainerWithTopBorder>
                        <Key>Select a time:</Key>
                        <Value>
                            <FormControl style={{width: "100%"}}>
                                <Select
                                    value={broadcastIndex}
                                    onChange={(event) => {
                                        this.setState({
                                            broadcastIndex: event.target.value as number
                                        });
                                    }}>
                                    <MenuItem key={"null_value_option"} value={null}/>
                                    {broadcastList.map((broadcastData: BroadcastData, index: number) => {
                                        return <MenuItem key={broadcastData._id}
                                                         value={index}>{new Date(broadcastData.date).toString().substring(0, 24)}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Value>
                    </DetailsContainerWithTopBorder>
                    <Button
                        onClick={() => {
                            let broadcastData: BroadcastData = broadcastList[broadcastIndex];
                            this.props.onSubmitPress(broadcastData);
                        }}
                        style={{marginTop: 20, marginBottom: 10}}
                        variant="contained"
                        disabled={broadcastIndex == null}
                        color="primary">
                        Select a seat
                    </Button>
                </MainContainer>
            </Card>
        );
    }
}
