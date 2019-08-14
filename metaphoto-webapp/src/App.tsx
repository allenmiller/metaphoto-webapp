import React, { Component, Fragment } from "react";
import "./App.css";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import { setIsAuthenticated, setIsAuthenticating } from "./actions/authentication";
import {AuthenticationState} from './reducers/authentication';
class App extends Component<AuthenticationState> {

    async componentDidMount() {
        this.props.setIsAuthenticating(true);
        try {
            await Auth.currentSession();
            this.props.setIsAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
        this.props.setIsAuthenticating(false);
    }

    handleLogout = async (event:any) => {    //TODO: better type
        await Auth.signOut();
        this.props.setIsAuthenticated(false);
//        this.props.history.push("/login");
    };

    render() {
        return (
            !this.props.isAuthenticating &&
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Metaphoto</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {this.props.isAuthenticated
//                            ? < Nav pullLeft>  // TODO: how to define pullLeft here?
                            ? <Nav>
                                <LinkContainer to={"/filmStocks"}>
                                    <NavItem>Film Stocks</NavItem>
                                </LinkContainer>
                                <LinkContainer to={"/film"}>
                                    <NavItem>Film</NavItem>
                                </LinkContainer>
                            </Nav>
                            : <p/>
                        }
                        <Nav pullRight>
                            {this.props.isAuthenticated
                                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                                : <Fragment>
                                    <LinkContainer to="/signup">
                                        <NavItem>Signup</NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <NavItem>Login</NavItem>
                                    </LinkContainer>
                                </Fragment>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapReduxStoreToProps = (store: AuthenticationState) => ({
    isAuthenticated: store.isAuthenticated,
    isAuthenticating: store.isAuthenticating
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setIsAuthenticating,
    setIsAuthenticated
}, dispatch);

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(App));
