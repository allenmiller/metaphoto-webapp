import React from 'react';
import {API} from "aws-amplify";
import {Component} from "react";
import Select from "react-select";
import {connect} from 'react-redux';

import {
    addFilmStock,
    setFilmName,
    setFilmFormat,
    setFilmIso,
    setFilmCode,
    setFilmType,
} from '../store/filmstock/actions';

import {
    setShowAddFilmstockModal,
    setSelectedFilmstockKey,
    setSelectedFilmstockRow,
    setShowAddFilmstockButton,
    setShowEditFilmstockButton,
    setShowDeleteFilmstockButton
} from "../store/filmstocks/actions";

import { Button, Form, Modal } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";

import config from '../config';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../store';
import { FilmValueLabelPair, FilmstockRow } from '../store/filmstock/types';
import { EmptyFilmstockRow } from '../store/filmstocks/types';

type AddEditFilmStockModalProps = Readonly<{
    show: boolean,
    onExiting: () => void,
    filmstock: {
        filmstock: any //TODO
        filmName: string,
        filmFormat: string,
        filmIso: string,
        filmCode: string,
        filmType: string,
        defaultFilmFormats: FilmValueLabelPair[],
        defaultFilmTypes: FilmValueLabelPair[]
    },
    filmstocks: {
        modalMode: string,
        selectedFilmstockRow: FilmstockRow,
        showModal: boolean
    },
    addFilmStock: typeof addFilmStock
    setFilmName: typeof setFilmName,
    setFilmFormat: typeof setFilmFormat,
    setFilmIso: typeof setFilmIso,
    setFilmCode: typeof setFilmCode,
    setFilmType: typeof setFilmType,
    setShowAddFilmstockModal: typeof setShowAddFilmstockModal,
    setSelectedFilmstockKey: typeof setSelectedFilmstockKey,
    setSelectedFilmstockRow: typeof setSelectedFilmstockRow,
    setShowAddFilmstockButton: typeof setShowAddFilmstockButton,
    setShowEditFilmstockButton: typeof setShowEditFilmstockButton,
    setShowDeleteFilmstockButton: typeof setShowDeleteFilmstockButton
  
}>
class AddEditFilmStockModal extends Component<AddEditFilmStockModalProps> {

    validate = () => {
        let messages=[];
        if (!this.props.filmstock.filmName) {
            messages.push(" Name");
        }

        if (!this.props.filmstock.filmFormat) {
            messages.push(" Format");
        }

        if (!this.props.filmstock.filmIso) {
            messages.push(" ISO");
        }

        if (!this.props.filmstock.filmCode) {
            messages.push(" Code");
        }

        if (!this.props.filmstock.filmType) {
            messages.push(" Type");
        }

        return messages;
    };

    handleNameChange = (event:any) => {
        this.props.setFilmName(event.target.value);
    };

    handleFormatChange = (event:any) => {
        this.props.setFilmFormat(event.value);
    };

    handleIsoChange = (event:any) => {
        this.props.setFilmIso(event.target.value);
    };

    handleCodeChange = (event:any) => {
        this.props.setFilmCode(event.target.value);
    };

    handleTypeChange = (event:any) => {
        this.props.setFilmType(event.value);
    };

    saveFilmStock = () => {
        switch (this.props.filmstocks.modalMode) {
            case "ADD":
                this.saveNewFilmStock();
                return;
            case "EDIT":
                this.editFilmstock();
                return;
            default:
                console.log("ERROR: invalid modal mode ", this.props.filmstocks.modalMode);
        }

    };

    buildRequest = () => {
        return {
            body: {
                filmName: this.props.filmstock.filmName,
                filmFormat: this.props.filmstock.filmFormat,
                filmCode: this.props.filmstock.filmCode,
                iso: this.props.filmstock.filmIso,
                filmType: this.props.filmstock.filmType
            }
        };
    };

    saveNewFilmStock = () => {
        let messages = this.validate();
        if (messages.length > 0) {
            alert("Please specify" + messages);
            return;
        }
        let postFilmStocks = "/filmstock";
        API.post(config.apiGateway.NAME, postFilmStocks,this.buildRequest())
            .then(response => {
                this.dismiss();
            })
            .catch( err => {
                console.log("ERROR: ",err);
                let errorString = "POST error: ";
                if (err.response) {
                    errorString += `${err.response.status}: ${err.response.data}`;
                } else if (err.message) {
                    errorString += err.message;
                }
                console.log("ERROR: ",errorString);
                alert(errorString)
            })
    };

    editFilmstock = () => {
        let hashKeyToEdit = this.props.filmstocks.selectedFilmstockRow.primaryHashKey;
        let rangeKeyToEdit = this.props.filmstocks.selectedFilmstockRow.primaryRangeKey;
        let apiName = config.apiGateway.NAME;
        let editEndpoint = `/filmstock/${hashKeyToEdit}/${rangeKeyToEdit}`;
        console.log(`PUT ${editEndpoint}`);
        API.put(apiName, editEndpoint, this.buildRequest())
            .then(response => {
                this.props.setSelectedFilmstockKey("");
                this.props.setSelectedFilmstockRow(EmptyFilmstockRow);
                this.props.setShowAddFilmstockButton(true);
                this.props.setShowDeleteFilmstockButton(false);
                this.props.setShowEditFilmstockButton(false);
                this.dismiss();
            })
            .catch(error => {
                console.log("Error editing item", error);
                alert("Error editing item:" + error);
            })

    };

    dismiss = () => {
        this.props.setShowAddFilmstockModal(false);
    };

    render() {
        if (this.props.filmstock.filmFormat === "" && this.props.filmstock.defaultFilmFormats && this.props.filmstock.defaultFilmFormats.length > 0) {
            this.props.setFilmFormat(this.props.filmstock.defaultFilmFormats[0].value);
        }
        if (this.props.filmstock.filmType === "" && this.props.filmstock.defaultFilmTypes && this.props.filmstock.defaultFilmTypes.length > 0) {
            this.props.setFilmType(this.props.filmstock.defaultFilmTypes[0].value);
        }
        return (
        <Modal show={this.props.filmstocks.showModal} onHide={this.dismiss} onExiting={this.props.onExiting}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new film stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormControl
                            autoFocus
                            disabled={this.props.filmstocks.modalMode === "EDIT"}
                            value={this.props.filmstock.filmName}
                            onChange={this.handleNameChange}
                        />
                        Name
                    </FormGroup>
                    <FormGroup>
                        <Select
                            isDisabled={this.props.filmstocks.modalMode === "EDIT"}
                            options={this.props.filmstock.defaultFilmFormats}
                            defaultValue={this.props.filmstock.defaultFilmFormats[0]}
                            onChange={this.handleFormatChange}
                        />
                        Format
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            value={this.props.filmstock.filmIso}
                            onChange={this.handleIsoChange}
                        />
                        ISO
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            value={this.props.filmstock.filmCode}
                            onChange={this.handleCodeChange}
                        />
                        Code
                    </FormGroup>
                    <FormGroup>
                        <Select
                            options={this.props.filmstock.defaultFilmTypes}
                            defaultValue={this.props.filmstock.defaultFilmTypes[0]}
                            onChange={this.handleTypeChange}
                        />
                        Type
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.saveFilmStock}>
                    Save
                </Button>
                <Button onClick={this.dismiss}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

const mapReduxStoreToProps = (state: AppState, ownProps: RouteComponentProps) => ({
    filmstock: {
        filmstock: state.filmstock.filmstock,
        filmName: state.filmstock.filmName,
        filmFormat: state.filmstock.filmFormat,
        filmIso: state.filmstock.filmIso,
        filmCode: state.filmstock.filmCode,
        filmType: state.filmstock.filmType,
        defaultFilmFormats: state.filmstock.defaultFilmFormats,
        defaultFilmTypes: state.filmstock.defaultFilmTypes
    },
    filmstocks: {
        modalMode: state.filmstocks.modalMode,
        selectedFilmstockRow: state.filmstocks.selectedFilmstockRow,
        showModal: state.filmstocks.showAddFilmstockModal
    }
});

const mapDispatchToProps = {
    addFilmStock,
    setFilmName,
    setFilmFormat,
    setFilmIso,
    setFilmCode,
    setFilmType,
    setShowAddFilmstockModal,
    setSelectedFilmstockKey,
    setSelectedFilmstockRow,
    setShowAddFilmstockButton,
    setShowEditFilmstockButton,
    setShowDeleteFilmstockButton
};

export default connect(mapReduxStoreToProps, mapDispatchToProps)(AddEditFilmStockModal);
