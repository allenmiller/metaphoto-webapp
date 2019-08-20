import React, { Component, FormEvent } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import {connect} from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./Login.css";
import {setIsLoading} from "../store/feedback/actions";
import {
    setEmail,
    setPassword,
    setIsAuthenticated,
    setIsAuthenticating
} from "../store/authentication/actions";
import {AppState} from '../store';

type LoginProps = Readonly<{
    authentication : {
        isAuthenticated: boolean,
        isAuthenticating: boolean,
        email: string,
        password: string
     },
    feedback: {
        isLoading: boolean
    },
    setIsAuthenticated: typeof setIsAuthenticated,
    setIsAuthenticating: typeof setIsAuthenticating,
    setEmail: typeof setEmail,
    setPassword: typeof setPassword,
    setIsLoading: typeof setIsLoading
}>;
class Login extends Component<LoginProps> {
    componentDidMount() {
        this.props.setIsAuthenticated(false);
        this.props.setIsAuthenticating(true);
    }
    validateForm() {
        return this.props.authentication.email.length > 0 && this.props.authentication.password.length > 0;
    }

    handleChange = (event:any) => {  // TODO: follow https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208 and strengthen typing when that dumpster fire gets fixed.
        switch (event.currentTarget.id) {
            case "email":
                this.props.setEmail(event.currentTarget.value);
                break;
            case "password":
                this.props.setPassword(event.currentTarget.value);
                break;
            default:
                console.log("ERROR, unexpected event: ", event.target.id)
        }
    };

    handleSubmit = async (event:FormEvent) => {
        event.preventDefault();
        this.props.setIsLoading(true);
        try {
            const user = await Auth.signIn(this.props.authentication.email, this.props.authentication.password);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                console.log("new password required");  //TODO: add password reset
//                const loggedUser = await Auth.completeNewPassword(user, "ZZZZZZZZ", {"email":"test@ajmiller.net", "phone_number":"+19705551212"});
//                console.log(loggedUser);

            }
            this.props.setIsAuthenticated(true);
            this.props.setIsAuthenticating(false);
            this.props.setPassword("");
         } catch (e) {
             console.log("Error authorizing user ", this.props.authentication.email, e, e.message);
            alert(`Error authorizing user ${this.props.authentication.email} : ${e.message}`);
            this.props.setPassword("");
            this.props.setIsLoading(false);
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
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.props.feedback.isLoading}
                        text="Login"
                        loadingText="Logging in…"
                    />
                </form>
            </div>
        );
    }
}

const mapReduxStoreToProps = (state:AppState, routeProps: RouteComponentProps) => ({
    authentication : {
        isAuthenticated: state.authentication.isAuthenticated,
        isAuthenticating: state.authentication.isAuthenticating,
        email: state.authentication.email,
        password: state.authentication.password
        },
    feedback: {
        isLoading: state.feedback.isLoading,
     }
});

const mapDispatchToProps = {
    setIsAuthenticated,
    setIsAuthenticating,
    setEmail,
    setPassword,
    setIsLoading
}

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(Login));
