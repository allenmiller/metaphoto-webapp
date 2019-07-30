import React, { Component } from "react";
import "./Login.css";

import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


import {setIsAuthenticated} from "../actions/actions";

class FilmStocks extends Component {

    render() {
        return (
            <div className="FilmStocks">
            Here are some film stocks.
            </div>
        );
    }
}

const mapReduxStoreToProps = store => ({
    isAuthenticated: store.authentication.isAuthenticated,
    filmStocks: store.filmstocks.filmStocks
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsAuthenticated
}, dispatch);

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(FilmStocks));
