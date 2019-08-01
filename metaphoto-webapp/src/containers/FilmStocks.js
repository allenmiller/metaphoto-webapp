import React, { Component } from "react";
import "./Login.css";
import config from '../config';

import {API} from "aws-amplify";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {setFilmStocks, setIsAuthenticated} from "../actions/actions";
import {Button, ButtonToolbar} from "react-bootstrap";

class FilmStocks extends Component {

    componentDidMount() {
        this.getFilmStocks();
    }

    getFilmStocks() {
        let apiName = config.apiGateway.NAME;
        let getFilmStocks = "/filmstocks";
        console.log("getting all film stocks");
        API.get(apiName, getFilmStocks, {})
            .then(response => {
                console.log("in callback", response);
                this.props.setFilmStocks(response)
            })
            .catch(error => {
                console.log("error in getFilmStocks()", error);
            })
    }

    handleSubmit = async event => {
        event.preventDefault();
        console.log("adding new film Stock", event);
    };

    render() {
        const  MAX_TABLE_LENGTH = 10;
        const columns = [
            {
                id: "filmName",
                Header: "Name",
                accessor: d => d.data.filmName
            },
            {
                id: 'Format',
                Header: "Format",
                accessor: d => d.data.filmFormat
            },
            {
                id: 'filmCode',
                Header: "Film Code",
                accessor: d => d.data.filmCode
            },
            {
                id: 'iso',
                Header: 'ISO',
                accessor: d => d.data.iso
            },
            {
                id: 'filmType',
                Header: 'Type',
                accessor: d => d.data.filmType
            }

        ];
        return (
            (this.props.filmStocks !== undefined) &&
            (this.props.filmStocks.length > 0) &&
            <div className="FilmStocks">
                <ReactTable
                    data = {this.props.filmStocks}
                    pageSize={(this.props.filmStocks.length > MAX_TABLE_LENGTH) ? MAX_TABLE_LENGTH : this.props.filmStocks.length}
                    columns = {columns}
                />
                <form onSubmit={this.handleSubmit}>
                    <ButtonToolbar>
                        <Button type="submit">
                            Add
                        </Button>
                        <Button type="submit" disabled={true}>
                            Edit
                        </Button>
                        <Button type="submit" disabled={true}>
                            Delete
                        </Button>
                    </ButtonToolbar>
                </form>
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
    setFilmStocks: setFilmStocks
}, dispatch);

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(FilmStocks));
