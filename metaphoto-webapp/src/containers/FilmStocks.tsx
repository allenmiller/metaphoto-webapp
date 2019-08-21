import React, { Component } from "react";

import {API} from "aws-amplify";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import selectTableHOC from "react-table/lib/hoc/selectTable";

import {setIsAuthenticated} from "../store/authentication/actions";
import {
    setDefaultFilmFormats,
    setDefaultFilmTypes,
    setFilmCode,
    setFilmFormat,
    setFilmIso,
    setFilmName,
    setFilmType,
} from "../store/filmstock/actions"
import {
    setFilmStocks,
    setModalMode,
    setSelectedFilmstockKey,
    setSelectedFilmstockRow,
    setShowAddFilmstockModal,
    setShowAddFilmstockButton,
    setShowDeleteFilmstockButton,
    setShowEditFilmstockButton
} from "../store/filmstocks/actions";

import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import Button from "react-bootstrap/es/Button";

import { AppState } from "../store";
import "./Login.css";
import config from '../config';
import AddEditFilmStockModal from "./AddEditFilmStockModal";
import { FilmstockDefaultsResponse, FilmstockRow } from "../store/filmstock/types";

type FilmStocksProps = Readonly<{
    authentication: {
        isAuthenticated: boolean
    },
//    filmStockDefaults: state.filmstock.defaults,
    filmstock: {
        filmName: string,
        filmFormat: string,
        filmIso: string,
        filmCode: string,
        filmType: string
    },
    filmstocks: {
        filmStocks: FilmstockRow[],
        modalMode: string,
        selectedFilmstockKey: string,
        selectedFilmstockRow: FilmstockRow,
        showAddFilmstockModal: boolean,
        showAddFilmstockButton: boolean,
        showDeleteFilmstockButton: boolean,
        showEditFilmstockButton: boolean
    }
    setIsAuthenticated: typeof setIsAuthenticated,
    setFilmStocks: typeof setFilmStocks,
    setFilmName: typeof setFilmName,
    setFilmFormat: typeof setFilmFormat,
    setFilmIso: typeof setFilmIso,
    setFilmCode: typeof setFilmCode,
    setFilmType: typeof setFilmType,
    setModalMode: typeof setModalMode,
    setSelectedFilmstockKey: typeof setSelectedFilmstockKey,
    setSelectedFilmstockRow: typeof setSelectedFilmstockRow,
    setDefaultFilmFormats: typeof setDefaultFilmFormats,
    setDefaultFilmTypes: typeof setDefaultFilmTypes,
    setShowAddFilmstockModal: typeof setShowAddFilmstockModal,
    setShowAddFilmstockButton: typeof setShowAddFilmstockButton,
    setShowDeleteFilmstockButton: typeof setShowDeleteFilmstockButton,
    setShowEditFilmstockButton: typeof setShowEditFilmstockButton
}>

class FilmStocks extends Component<FilmStocksProps> {

    componentDidMount() {
        this.getFilmStocks();
        this.getFilmStockDefaults();
    }

    displayAddModal = () => {
        this.props.setModalMode("ADD");  //TODO: typesafe
        this.props.setShowAddFilmstockModal(true);
    };

    displayEditModal = () => {
        this.props.setModalMode("EDIT");
        this.props.setShowAddFilmstockModal(true);
    };

    deleteFilmstock = () => {
        let hashKeyToDelete = this.props.filmstocks.selectedFilmstockRow.primaryHashKey;
        let rangeKeyToDelete = this.props.filmstocks.selectedFilmstockRow.primaryRangeKey;
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
            .then((response:FilmstockDefaultsResponse) => {
                this.props.setDefaultFilmTypes(response.filmTypes);
                this.props.setDefaultFilmFormats(response.filmFormats);
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

    toggleSelection = (key:string, shift:any, row:FilmstockRow) => {
        let selectedFilmstockKey = this.props.filmstocks.selectedFilmstockKey;
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
            this.props.setFilmName(row.data.filmName);
            this.props.setFilmFormat(row.data.filmFormat);
            this.props.setFilmIso(row.data.filmIso);
            this.props.setFilmCode(row.data.filmCode);
            this.props.setFilmType(row.data.filmType);
        }
    };

    isSelected = (key: string) => {
        return (this.props.filmstocks.selectedFilmstockKey === "select-" + key);
    };

    render() {
        const SelectTable = selectTableHOC(ReactTable);
        const  MAX_TABLE_LENGTH = 10;
        const columns = [
            {
                id: "primaryHashKey",
                Header: "Key",
                accessor: (d:FilmstockRow) => d.primaryHashKey,
                show: false
            },
            {
                id: "filmName",
                Header: "Name",
                accessor: (d:FilmstockRow) => d.data.filmName
            },
            {
                id: 'Format',
                Header: "Format",
                accessor: (d:FilmstockRow) => d.data.filmFormat
            },
            {
                id: 'filmCode',
                Header: "Film Code",
                accessor: (d:FilmstockRow) => d.data.filmCode
            },
            {
                id: 'iso',
                Header: 'ISO',
                accessor: (d:FilmstockRow) => d.data.filmIso
            },
            {
                id: 'filmType',
                Header: 'Type',
                accessor: (d:FilmstockRow) => d.data.filmType
            }

        ];
        return (
            (this.props.filmstocks.filmStocks !== undefined) &&
            <div className="FilmStocks">
                <SelectTable
                    data = {this.props.filmstocks.filmStocks}
                    pageSize={(this.props.filmstocks.filmStocks.length > MAX_TABLE_LENGTH) ? MAX_TABLE_LENGTH : this.props.filmstocks.filmStocks.length}
                    columns = {columns}
                    keyField="primaryHashKey"
                    selectType="radio"
                    isSelected={this.isSelected}
                    toggleSelection={this.toggleSelection}
                />
                <ButtonToolbar>
                    <Button
                        onClick={this.displayAddModal}
                        disabled={!this.props.filmstocks.showAddFilmstockButton}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={this.displayEditModal}
                        disabled={!this.props.filmstocks.showEditFilmstockButton}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={this.deleteFilmstock}
                        disabled={!this.props.filmstocks.showDeleteFilmstockButton}
                    >
                        Delete
                    </Button>
                </ButtonToolbar>
                <AddEditFilmStockModal
                    show={this.props.filmstocks.showAddFilmstockModal}
                    onExiting={this.getFilmStocks}
                />
            </div>
        );
    }
}

const mapReduxStoreToProps = (state: AppState, ownProps: RouteComponentProps) => ({
    authentication: {
        isAuthenticated: state.authentication.isAuthenticated
    },
//    filmStockDefaults: state.filmstock.defaults,
    filmstock: {
        filmName: state.filmstock.filmName,
        filmFormat: state.filmstock.filmFormat,
        filmIso: state.filmstock.filmIso,
        filmCode: state.filmstock.filmCode,
        filmType: state.filmstock.filmType,
    },
    filmstocks: {
        filmStocks: state.filmstocks.filmstocks,
        modalMode: state.filmstocks.modalMode,
        selectedFilmstockKey: state.filmstocks.selectedFilmstockKey,
        selectedFilmstockRow: state.filmstocks.selectedFilmstockRow,
        showAddFilmstockModal: state.filmstocks.showAddFilmstockModal,
        showAddFilmstockButton: state.filmstocks.showAddFilmstockButton,
        showDeleteFilmstockButton: state.filmstocks.showDeleteFilmstockButton,
        showEditFilmstockButton: state.filmstocks.showEditFilmstockButton
    }
});

const mapDispatchToProps = {
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
};

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(FilmStocks));
