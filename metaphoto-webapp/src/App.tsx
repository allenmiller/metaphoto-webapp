import React, { Component, Fragment } from "react";
import "./App.css";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
//import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import { setIsAuthenticated, setIsAuthenticating } from "./store/authentication/actions";
import { AppState } from "./store";

type AppProps = Readonly<{
    authentication : {
        isAuthenticated: boolean,
        isAuthenticating: boolean,
        setIsAuthenticated: typeof setIsAuthenticated,
        setIsAuthenticating: typeof setIsAuthenticating
    }
}>;
class App extends Component<AppProps> {

    async componentDidMount() {
        this.props.authentication.setIsAuthenticating(true);
        try {
            await Auth.currentSession();
            this.props.authentication.setIsAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
        this.props.authentication.setIsAuthenticating(false);
    }

    handleLogout = async (event:any) => {    //TODO: better type
        await Auth.signOut();
        this.props.authentication.setIsAuthenticated(false);
//        this.props.history.push("/login");
    };

    render() {
        return (
            !this.props.authentication.isAuthenticating &&
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Metaphoto</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {this.props.authentication.isAuthenticated
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
                            {this.props.authentication.isAuthenticated
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

const mapReduxStateToProps = (state: AppState, ownProps:any) => ({
    authentication:{
        isAuthenticated: state.authentication.isAuthenticated,
        isAuthenticating: state.authentication.isAuthenticating,
        setIsAuthenticated: state.authentication.setIsAuthenticated,
        setIsAuthenticating: state.authentication.setIsAuthenticating
    }
});

/* const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setIsAuthenticating,
    setIsAuthenticated
}, dispatch);
 */
export default withRouter(connect(mapReduxStateToProps, {setIsAuthenticated, setIsAuthenticating})(App));
