import * as React from "react";
import LoadingComponent from "./LoadingComponent";
import {StoredItem} from "../constants/StoredItem";

interface Props {
    history: any;
    children?: React.ReactNode;

    functionToCallAfterAuthCheck: Function;
}

interface State {
    loading: boolean;
}

export default class ProtectedPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    async componentDidMount(): Promise<void> {
        let token: string = await localStorage.getItem(StoredItem.JWT_TOKEN);
        if (token == null) {
            this.props.history.push("/");
        }
        this.setState({
            loading: false
        });
        this.props.functionToCallAfterAuthCheck();
    }

    render() {
        if(this.state.loading) {
            return <LoadingComponent />
        }
        return (
            <>
                {this.props.children}
            </>
        );
    }
}
