import React, { Component } from "react";
import "./Login.css";
import config from '../config';

import { API } from "aws-amplify";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


import {addFilmStock, setIsAuthenticated} from "../actions/actions";

class FilmStocks extends Component {

    constructor(props) {
        super(props);
        this.getFilmStocks();
    }

    getFilmStocks() {
        let apiName = config.apiGateway.NAME;
        let getFilmStocks = "/filmstocks";
        console.log("getting all film stocks");
        API.get(apiName, getFilmStocks, {})
            .then(response => {
                console.log("in callback", response);
                this.props.addFilmStock(response.data)
            })
    }
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
    setIsAuthenticated,
    addFilmStock
}, dispatch);

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(FilmStocks));
