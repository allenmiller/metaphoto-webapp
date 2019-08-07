import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./App.css";
import Routes from "./Routes";
import { setIsAuthenticated, setIsAuthenticating } from "./actions/actions";

class App extends Component {
    constructor(props) {
        super(props);
        props.setIsAuthenticating(true);
    }

    async componentDidMount() {
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

    handleLogout = async event => {
        await Auth.signOut();
        this.props.setIsAuthenticated(false);
        this.props.history.push("/login");
    };

    render() {
        return (
            !this.props.isAuthenticating &&
            <div className="App container">
                <Navbar collapseOnSelect>
                    <Navbar.Brand>
                        <Link to="/">Metaphoto</Link>
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        {this.props.isAuthenticated
                            ? <Nav>
                                <LinkContainer to={"/filmStocks"}>
                                    <Navbar.Brand>
                                        Film Stocks
                                    </Navbar.Brand>
                                </LinkContainer>
                            </Nav>
                            : <p/>
                        }
                        <Nav className="justify-content-end">
                            {this.props.isAuthenticated
                                ? <Navbar.Brand onClick={this.handleLogout}>
                                    <Link to="/">Logout</Link>
                                  </Navbar.Brand>
                                : <Fragment>
                                    <LinkContainer to="/signup">
                                        <Navbar.Brand>
                                        Signup
                                        </Navbar.Brand>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <Navbar.Brand>
                                        Login
                                        </Navbar.Brand>
                                    </LinkContainer>
                                </Fragment>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes />
            </div>
        );
    }
}

const mapReduxStoreToProps = store => ({
    isAuthenticated: store.authentication.isAuthenticated,
    isAuthenticating: store.authentication.isAuthenticating
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsAuthenticating,
    setIsAuthenticated
}, dispatch);

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(App));
