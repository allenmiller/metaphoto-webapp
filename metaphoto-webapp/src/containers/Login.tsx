import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";

import {connect} from "react-redux";

import {setIsLoading} from "../store/feedback/actions";
import {
    setEmail,
    setPassword,
    setIsAuthenticated,
    setIsAuthenticating
} from "../store/authentication/actions";
import {AppState} from '../store';
import { withRouter } from "react-router-dom";

type LoginProps = Readonly<{
    authentication : {
        isAuthenticated: boolean,
        isAuthenticating: boolean,
        email: string,
        password: string,
        setIsAuthenticated: typeof setIsAuthenticated,
        setIsAuthenticating: typeof setIsAuthenticating,
        setEmail: typeof setEmail,
        setPassword: typeof setPassword
    },
    feedback: {
        setIsLoading: typeof setIsLoading
    }
}>;
class Login extends Component<LoginProps> {
 
    constructor(props:LoginProps) {
        super(props);
        console.log("Login constructor");
    }
    componentDidMount() {
        console.log("Login did mount");
        this.props.feedback.setIsLoading(false);
    }
    validateForm() {
        return this.props.authentication.email.length > 0 && this.props.authentication.password.length > 0;
    }

    handleChange = (event:any) => {  // TODO: better type
        switch (event.target.id) {
            case "email":
                this.props.authentication.setEmail(event.target.value);
                break;
            case "password":
                this.props.authentication.setPassword(event.target.value);
                break;
            default:
                console.log("ERROR, unexpected event: ", event.target.id)
        }
    };

    handleSubmit = async (event:any) => {
        event.preventDefault();
        this.props.feedback.setIsLoading(true);
        try {
            const user = await Auth.signIn(this.props.authentication.email, this.props.authentication.password);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                console.log("new password required");  //TODO: add password reset
//                const loggedUser = await Auth.completeNewPassword(user, "ZZZZZZZZ", {"email":"test@ajmiller.net", "phone_number":"+19705551212"});
//                console.log(loggedUser);

            }
            this.props.authentication.setIsAuthenticated(true);
            this.props.authentication.setPassword("");
         } catch (e) {
            alert(e.message);
            this.props.authentication.setPassword("");
            this.props.feedback.setIsLoading(false);
        }
    };


    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.props.authentication.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.props.authentication.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                </form>
            </div>
        );
    }
}

const mapReduxStoreToProps = (state:AppState, ownProps:any) => ({
    authentication : {
        isAuthenticated: state.authentication.isAuthenticated,
        isAuthenticating: state.authentication.isAuthenticating,
        email: state.authentication.email,
        password: state.authentication.password,
        setIsAuthenticated: setIsAuthenticated,
        setIsAuthenticating: setIsAuthenticating,
        setEmail: setEmail,
        setPassword: setPassword
        },
    feedback: {
        setIsLoading: setIsLoading
    }
});

export default withRouter(connect(mapReduxStoreToProps,{setEmail, setPassword, setIsLoading})(Login));
