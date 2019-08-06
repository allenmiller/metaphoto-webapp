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
                    {/*<Navbar.Toggle />*/}
                    <Navbar.Collapse>
                        {this.props.isAuthenticated
                            ? <Nav>
                                <LinkContainer to={"/filmStocks"}>
                                    <Nav.Item>Film Stocks</Nav.Item>
                                </LinkContainer>
                            </Nav>
                            : <p/>
                        }
                        <Nav className="justify-content-end">
                            {this.props.isAuthenticated
                                ? <Nav.Item onClick={this.handleLogout}>Logout</Nav.Item>
                                : <Fragment>
                                    <LinkContainer to="/signup">
                                        <Nav.Item>Signup</Nav.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <Nav.Item>Login</Nav.Item>
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
