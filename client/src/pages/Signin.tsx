import * as React from "react";
import {StoredItem} from "../constants/StoredItem";
import {loginUser, registerUser} from "../constants/backend_api_action";
import {nativeColors} from "../constants/colors";
import {responsiveFontSizeTheme, validateEmail} from "../constants/nativeFunctions";
import {withRouter} from "react-router-dom";
import {Button, TextField, Typography} from "@material-ui/core";
import {styled} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";

const Container = styled('div')({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10% 0"
});

const FooterButton = styled('div')({
    fontSize: 16,
    fontWeight: 700,
    textAlign: "left",
    color: nativeColors.marcusBlue2,
    cursor: "pointer"
});

interface Props {
    history: any;
}

interface State {
    email: string;
    password: string;
    name: string;

    creatingNewAccount: boolean;
}

class SignIn extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: "",
            creatingNewAccount: false
        };

        this.loginWithEmailAddressAndPassword = this.loginWithEmailAddressAndPassword.bind(this);
        this.signupWithEmailAddressAndPassword = this.signupWithEmailAddressAndPassword.bind(this);
        this.validateInputFields = this.validateInputFields.bind(this);
    }

    async signupWithEmailAddressAndPassword() {
        let {email, password, name} = this.state;
        try {
            this.validateInputFields();
            let token: string = await registerUser(email, password, name);
            await localStorage.setItem(StoredItem.JWT_TOKEN, token);
            this.props.history.push("/welcome/");
        } catch (error) {
            alert(error.message);
        }
    }

    async loginWithEmailAddressAndPassword() {
        let {email, password} = this.state;
        try {
            this.validateInputFields();
            let token: string = await loginUser(email, password);
            await localStorage.setItem(StoredItem.JWT_TOKEN, token);
            this.props.history.push("/welcome/");
        } catch (error) {
            alert(error.message);
        }
    }

    validateInputFields(): void {
        let {email, password, name, creatingNewAccount} = this.state;
        if (creatingNewAccount && name.trim().length === 0) {
            throw new Error("Name cannot be empty!");
        } else if (email.trim().length === 0 || !validateEmail(email)) {
            throw new Error("Invalid Email!");
        } else if (password.trim().length < 8) {
            throw new Error("Password must be at least 8 characters long!");
        }
    }

    render() {
        let {creatingNewAccount} = this.state;

        const buttonStyle = {
            minWidth: 200,
            margin: "10px 20px",
            minHeight: 50
        };

        const textInputStyle = {
            width: "90%",
            backgroundColor: "white"
        };

        return (
            <Container>
                <ThemeProvider theme={responsiveFontSizeTheme}>
                    <Typography style={{marginBottom: 30}} variant="h4">
                        Please {creatingNewAccount ? "sign up" : "log in"} to continue
                    </Typography>
                </ThemeProvider>
                {creatingNewAccount &&
                <TextField
                    style={textInputStyle}
                    id="outlined-name"
                    label="Name"
                    value={this.state.name}
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {
                        this.setState({
                            name: e.target.value
                        });
                    }}
                />}
                <TextField
                    style={textInputStyle}
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    margin={"normal"}
                    variant="outlined"
                    value={this.state.email}
                    onChange={(e) => {
                        this.setState({
                            email: e.target.value
                        });
                    }}
                />
                <TextField
                    style={textInputStyle}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={this.state.password}
                    onChange={(e) => {
                        this.setState({
                            password: e.target.value
                        });
                    }}
                />
                <Button
                    style={buttonStyle}
                    variant="contained"
                    color={"primary"}
                    onClick={() => {
                        creatingNewAccount
                            ? this.signupWithEmailAddressAndPassword()
                            : this.loginWithEmailAddressAndPassword()
                    }}>
                    {creatingNewAccount ? "Sign Up" : "Log In"}
                </Button>
                <FooterButton className={"col-sm-6 no-padding"}
                              onClick={() => {
                                  this.setState((prevState: State) => {
                                      return {
                                          creatingNewAccount: !prevState.creatingNewAccount
                                      }
                                  })
                              }}>
                    {creatingNewAccount ? "Already have an account?" : "Don't have an account? Sign up!"}
                </FooterButton>
            </Container>
        );
    }
}

export default withRouter(SignIn);
