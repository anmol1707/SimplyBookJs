import * as React from "react";
import {withRouter} from "react-router-dom";
import {StoredItem} from "../constants/StoredItem";
import {Button} from "@material-ui/core";
import {styled} from "@material-ui/core/styles";

const NavBarContainer = styled('div')({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "15px 0px",
    minWidth: "100%",
    flexWrap: "wrap"
});

interface Props {
    history: any;
}

interface State {
}

class InternalNavBar extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    render() {
        const buttonStyle = {
            minWidth: 200,
            margin: "10px 20px",
            minHeight: 50
        };

        return (
            <NavBarContainer>
                <Button
                style={buttonStyle}
                variant="contained"
                color={"secondary"}
                onClick={() => {
                    if(!(window.location.href.endsWith("/welcome/") || window.location.href.endsWith("/welcome"))) {
                        this.props.history.push('/welcome/');
                    }
                }}>
                Home
            </Button>
                <Button
                    style={buttonStyle}
                    variant="contained"
                    color={"secondary"}
                    onClick={() => {
                        if(!(window.location.href.endsWith("/booking-history/") || window.location.href.endsWith("/booking-history"))) {
                            this.props.history.push("/booking-history/");
                        }
                    }}>
                    My Bookings
                </Button>
                <Button
                    style={buttonStyle}
                    variant="contained"
                    color={"secondary"}
                    onClick={this.logout}>
                    Logout
                </Button>
            </NavBarContainer>
        )
    }

    async logout() {
        await localStorage.removeItem(StoredItem.JWT_TOKEN);
        this.props.history.push('/');
    }
}

export default withRouter(InternalNavBar);
