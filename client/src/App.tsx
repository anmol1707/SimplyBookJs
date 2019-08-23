import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LoadingComponent from "./components/LoadingComponent";
import {StoredItem} from "./constants/StoredItem";
import {loginWithJwt} from "./constants/backend_api_action";

interface State {
    loading: boolean;
}

interface Props {
    history: any;
}

class App extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    async componentDidMount(): Promise<any> {
        let token: string = await localStorage.getItem(StoredItem.JWT_TOKEN);
        if (token != null) {
            try {
                let updatedToken: string = await loginWithJwt(token);
                await localStorage.setItem(StoredItem.JWT_TOKEN, updatedToken);
                this.props.history.push("/welcome/");
            } catch (error) {
                await localStorage.removeItem(StoredItem.JWT_TOKEN);
            }
        }
        this.setState({
            loading: false
        });
    }

    render() {
        if (this.state.loading) {
            return <LoadingComponent/>
        } else return null;
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
