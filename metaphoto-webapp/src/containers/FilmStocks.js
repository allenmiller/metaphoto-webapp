import React, { Component } from "react";
import "./Login.css";
import config from '../config';

import { API } from "aws-amplify";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
                this.props.addFilmStock(response)
            })
            .catch(error => {
                console.log("error in getFilmStocks()", error);
            })
    }

    render() {
        const columns = [
            {
                Header: "Name",
                accessor: "primaryHashKey"
            },
            {
                Header: "Format",
                accessor: d => d.data.filmFormat
            }

        ];
        return (
            <div className="FilmStocks">
            Here are some film stocks.
                <ReactTable
                    data = {this.props.filmStocks}
                    columns = {columns}
                />
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
