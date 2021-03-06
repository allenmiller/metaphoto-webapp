import React, { Component } from "react";

import {API} from "aws-amplify";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import selectTableHOC from "react-table/lib/hoc/selectTable";

import {setIsAuthenticated} from "../actions/authentication";
import {
    setDefaultFilmFormats,
    setDefaultFilmTypes,
    setFilmCode,
    setFilmFormat,
    setFilmIso,
    setFilmName,
    setFilmType,
} from "../actions/filmstock"
import {
    setFilmStocks,
    setModalMode,
    setSelectedFilmstockKey,
    setSelectedFilmstockRow,
    setShowAddFilmstockModal,
    setShowAddFilmstockButton,
    setShowDeleteFilmstockButton,
    setShowEditFilmstockButton
} from "../actions/filmstocks";

import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import Button from "react-bootstrap/es/Button";

import "./Login.css";
import config from '../config';
import AddEditFilmStockModal from "./AddEditFilmStockModal";

class FilmStocks extends Component {

    componentDidMount() {
        this.getFilmStocks();
        this.getFilmStockDefaults();
    }

    displayAddModal = () => {
        this.props.setModalMode("ADD");
        this.props.setShowAddFilmstockModal(true);
    };

    displayEditModal = () => {
        this.props.setModalMode("EDIT");
        this.props.setShowAddFilmstockModal(true);
    };

    deleteFilmstock = () => {
        let hashKeyToDelete = this.props.selectedFilmstockRow.primaryHashKey;
        let rangeKeyToDelete = this.props.selectedFilmstockRow.primaryRangeKey;
        let apiName = config.apiGateway.NAME;
        let deleteEndpoint = `/filmstock/${hashKeyToDelete}/${rangeKeyToDelete}`;
        console.log(`DELETE ${deleteEndpoint}`);
        API.del(apiName, deleteEndpoint, {})
            .then(response => {
                this.props.setSelectedFilmstockKey("");
                this.props.setSelectedFilmstockRow({});
                this.props.setShowAddFilmstockButton(true);
                this.props.setShowDeleteFilmstockButton(false);
                this.props.setShowEditFilmstockButton(false);
                this.getFilmStocks();  //TODO: don't need to re-read the entire table, just delete item from props.
            })
            .catch(error => {
                console.log("Error deleting item", error);
                alert("Error deleting item:" + error);
            })

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
                this.props.setFilmStocks(response)
            })
            .catch(error => {
                console.log("error in getFilmStocks()", error);
            })
    };

    handleSubmit = async event => {
        event.preventDefault();
    };

    toggleSelection = (key, shift, row) => {
        let selectedFilmstockKey = this.props.selectedFilmstockKey;
        if (selectedFilmstockKey === key) {
            this.props.setSelectedFilmstockKey("");
            this.props.setSelectedFilmstockRow({});
            this.props.setShowAddFilmstockButton(true);
            this.props.setShowDeleteFilmstockButton(false);
            this.props.setShowEditFilmstockButton(false);
        } else {
            this.props.setSelectedFilmstockKey(key);
            this.props.setSelectedFilmstockRow(row);
            this.props.setShowAddFilmstockButton(false);
            this.props.setShowDeleteFilmstockButton(true);
            this.props.setShowEditFilmstockButton(true);
            this.props.setFilmName(row.data.filmName);  // When selecting a row, load those values into state
            this.props.setFilmFormat(row.data.filmFormat);
            this.props.setFilmIso(row.data.iso);
            this.props.setFilmCode(row.data.filmCode);
            this.props.setFilmType(row.data.filmType);
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
                        onClick={this.displayAddModal}
                        disabled={!this.props.showAddFilmstockButton}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={this.displayEditModal}
                        disabled={!this.props.showEditFilmstockButton}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={this.deleteFilmstock}
                        disabled={!this.props.showDeleteFilmstockButton}
                    >
                        Delete
                    </Button>
                </ButtonToolbar>
                <AddEditFilmStockModal
                    show={this.props.showAddFilmstockModal}
                    onExiting={this.getFilmStocks}
                />
            </div>
        );
    }
}

const mapReduxStoreToProps = store => ({
    isAuthenticated: store.authentication.isAuthenticated,
    filmStockDefaults: store.filmstock.defaults,
    filmName: store.filmstock.filmName,
    filmFormat: store.filmstock.filmFormat,
    filmIso: store.filmstock.filmIso,
    filmCode: store.filmstock.filmCode,
    filmType: store.filmstock.filmType,
    filmStocks: store.filmstocks.filmStocks,
    modalMode: store.filmstocks.modalMode,
    selectedFilmstockKey: store.filmstocks.selectedFilmstockKey,
    selectedFilmstockRow: store.filmstocks.selectedFilmstockRow,
    showAddFilmstockModal: store.filmstocks.showAddFilmstockModal,
    showAddFilmstockButton: store.filmstocks.showAddFilmstockButton,
    showDeleteFilmstockButton: store.filmstocks.showDeleteFilmstockButton,
    showEditFilmstockButton: store.filmstocks.showEditFilmstockButton
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsAuthenticated,
    setFilmStocks,
    setFilmName,
    setFilmFormat,
    setFilmIso,
    setFilmCode,
    setFilmType,
    setModalMode,
    setSelectedFilmstockKey,
    setSelectedFilmstockRow,
    setDefaultFilmFormats,
    setDefaultFilmTypes,
    setShowAddFilmstockModal,
    setShowAddFilmstockButton,
    setShowDeleteFilmstockButton,
    setShowEditFilmstockButton
}, dispatch);

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(FilmStocks));
