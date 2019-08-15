import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";

import {connect} from "react-redux";

//import {setIsLoading} from "../actions/feedback";
import {
    setIsAuthenticated,
    setEmail,
    setPassword
} from "../store/authentication/actions";
import {AuthenticationState} from '../store/authentication/types';

class Login extends Component<AuthenticationState> {
 
    componentDidMount() {
        //this.props.setIsLoading(false);
    }
    validateForm() {
        return this.props.email.length > 0 && this.props.password.length > 0;
    }

    handleChange = (event:any) => {  // TODO: better type
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

    handleSubmit = async (event:any) => {
        event.preventDefault();
 //       this.props.setIsLoading(true);
        try {
            const user = await Auth.signIn(this.props.email, this.props.password);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                console.log("new password required");  //TODO: add password reset
//                const loggedUser = await Auth.completeNewPassword(user, "ZZZZZZZZ", {"email":"test@ajmiller.net", "phone_number":"+19705551212"});
//                console.log(loggedUser);

            }
            this.props.setIsAuthenticated(true);
            this.props.setPassword("");
 //           this.props.history.push("/");
        } catch (e) {
            alert(e.message);
            this.props.setPassword("");
//            this.props.setIsLoading(false);
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
                </form>
            </div>
        );
    }
}

const mapReduxStoreToProps = (state:AuthenticationState) => ({
    isAuthenticated: state.isAuthenticated,
    email: state.email,
    password: state.password,
    //isLoading: state.feedback.isLoading
});

const mapDispatchToProps = {
    setIsAuthenticated,
 //   setIsLoading,
    setEmail,
    setPassword
};

export default connect(mapReduxStoreToProps,{setEmail, setPassword})(Login);
