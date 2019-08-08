import React, { Component } from "react";

import {API} from "aws-amplify";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import selectTableHOC from "react-table/lib/hoc/selectTable";

import {
    setDefaultFilmFormats,
    setDefaultFilmTypes,
    setFilmStocks,
    setSelectedFilmstockKey,
    setIsAuthenticated,
    setShowAddFilmstockModal,
    setShowAddFilmstockButton,
    setShowDeleteFilmstockButton,
    setShowEditFilmstockButton
} from "../actions/actions";
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import Button from "react-bootstrap/es/Button";

import "./Login.css";
import config from '../config';
import AddFilmStockModal from "./AddFilmStockModal";

class FilmStocks extends Component {


    componentDidMount() {
        this.getFilmStocks();
        this.getFilmStockDefaults();
    }

    displayModal = () => {
        this.props.setShowAddFilmstockModal(true);
    };

    getFilmStockDefaults = () => {
        let apiName = config.apiGateway.NAME;
        let getFilmStockDefaults = "/filmstock/defaults";
        API.get(apiName, getFilmStockDefaults, {})
            .then(response => {
                this.props.setDefaultFilmTypes(response);
                this.props.setDefaultFilmFormats(response);
            })
            .catch(error => {
                console.log("error in getFilmStockDefaults()", error);
            })
    };

    getFilmStocks = () => {
        let apiName = config.apiGateway.NAME;
        let getFilmStocks = "/filmstocks";
        API.get(apiName, getFilmStocks, {})
            .then(response => {
                console.log("in callback", response);
                this.props.setFilmStocks(response)
            })
            .catch(error => {
                console.log("error in getFilmStocks()", error);
            })
    };

    handleSubmit = async event => {
        event.preventDefault();
        console.log("adding new film Stock", event);
    };

    toggleSelection = (key, shift, row) => {
        let selectedFilmstockKey = this.props.selectedFilmstockKey;
        if (selectedFilmstockKey === key) {
            this.props.setSelectedFilmstockKey("");
            this.props.setShowAddFilmstockButton(true);
            this.props.setShowDeleteFilmstockButton(false);
            this.props.setShowEditFilmstockButton(false);
        } else {
            this.props.setSelectedFilmstockKey(key);
            this.props.setShowAddFilmstockButton(false);
            this.props.setShowDeleteFilmstockButton(true);
            this.props.setShowEditFilmstockButton(true);
        }
    };

    isSelected = (key) => {
        return (this.props.selectedFilmstockKey === "select-" + key);
    };

    render() {
        const SelectTable = selectTableHOC(ReactTable);
        const  MAX_TABLE_LENGTH = 10;
        const columns = [
            {
                id: "primaryHashKey",
                Header: "Key",
                accessor: d => d.primaryHashKey,
                show: false
            },
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
            <div className="FilmStocks">
                <SelectTable
                    data = {this.props.filmStocks}
                    pageSize={(this.props.filmStocks.length > MAX_TABLE_LENGTH) ? MAX_TABLE_LENGTH : this.props.filmStocks.length}
                    columns = {columns}
                    keyField="primaryHashKey"
                    selectType="radio"
                    isSelected={this.isSelected}
                    toggleSelection={this.toggleSelection}
                />
                <ButtonToolbar>
                    <Button
                        onClick={this.displayModal}
                        disabled={!this.props.showAddFilmstockButton}
                    >
                        Add
                    </Button>
                    <Button
                        disabled={!this.props.showEditFilmstockButton}
                    >
                        Edit
                    </Button>
                    <Button
                        disabled={!this.props.showDeleteFilmstockButton}
                    >
                        Delete
                    </Button>
                </ButtonToolbar>
                <AddFilmStockModal
                    show={this.props.showAddFilmstockModal}
                    onExiting={this.getFilmStocks}
                />
            </div>
        );
    }
}

const mapReduxStoreToProps = store => ({
    isAuthenticated: store.authentication.isAuthenticated,
    filmStocks: store.filmstocks.filmStocks,
    filmStockDefaults: store.filmstock.defaults,
    selectedFilmstockKey: store.filmstocks.selectedFilmstockKey,
    showAddFilmstockModal: store.filmstocks.showAddFilmstockModal,
    showAddFilmstockButton: store.filmstocks.showAddFilmstockButton,
    showDeleteFilmstockButton: store.filmstocks.showDeleteFilmstockButton,
    showEditFilmstockButton: store.filmstocks.showEditFilmstockButton
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsAuthenticated,
    setFilmStocks,
    setSelectedFilmstockKey,
    setDefaultFilmFormats,
    setDefaultFilmTypes,
    setShowAddFilmstockModal,
    setShowAddFilmstockButton,
    setShowDeleteFilmstockButton,
    setShowEditFilmstockButton
}, dispatch);

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(FilmStocks));
