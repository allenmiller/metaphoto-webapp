import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";

import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


import {setIsAuthenticated, setIsLoading, setEmail, setPassword} from "../actions/actions";

class Login extends Component {
    constructor(props) {
        super(props);
        props.setIsLoading(false);
    }

    validateForm() {
        return this.props.email.length > 0 && this.props.password.length > 0;
    }

    handleChange = event => {
        switch (event.target.id) {
            case "email":
                this.props.setEmail(event.target.value);
                break;
            case "password":
                this.props.setPassword(event.target.value);
                break;
            default:
                console.log("ERROR, unexpected event: ", event.target.id)
        }
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.props.setIsLoading(true);
        try {
            const user = await Auth.signIn(this.props.email, this.props.password);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                console.log("new password required");
//                const loggedUser = await Auth.completeNewPassword(user, "ZZZZZZZZ", {"email":"test@ajmiller.net", "phone_number":"+19705551212"});
//                console.log(loggedUser);

            }
            this.props.setIsAuthenticated(true);
            this.props.setPassword("");
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
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
                            value={this.props.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.props.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.props.isLoading}
                        text="Login"
                        loadingText="Logging in…"
                    />
                </form>
            </div>
        );
    }
}

const mapReduxStoreToProps = store => ({
    isAuthenticated: store.authentication.isAuthenticated,
    email: store.authentication.email,
    password: store.authentication.password,
    isLoading: store.feedback.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsAuthenticated,
    setIsLoading,
    setEmail,
    setPassword
}, dispatch);

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(Login));
