import React from 'react';
import {API} from "aws-amplify";
import {Component} from "react";
import Select from "react-select";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    setFilmName,
    setFilmFormat,
    setFilmIso,
    setFilmCode,
    setFilmType,
} from '../actions/filmstock';

import {
    setShowAddFilmstockModal,
    setSelectedFilmstockKey,
    setSelectedFilmstockRow,
    setShowAddFilmstockButton,
    setShowEditFilmstockButton,
    setShowDeleteFilmstockButton
} from "../actions/filmstocks";

import Button from "react-bootstrap/es/Button";
import Modal from "react-bootstrap/es/Modal";
import {Form} from "react-bootstrap";
import {FormControl} from "react-bootstrap";
import {FormGroup} from "react-bootstrap";

import config from '../config';


class AddEditFilmStockModal extends Component<props, state>  {

    validate = () => {
        let messages=[];
        if (!this.props.filmName) {
            messages.push(" Name");
        }

        if (!this.props.filmFormat) {
            messages.push(" Format");
        }

        if (!this.props.filmIso) {
            messages.push(" ISO");
        }

        if (!this.props.filmCode) {
            messages.push(" Code");
        }

        if (!this.props.filmType) {
            messages.push(" Type");
        }

        return messages;
    };

    handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setFilmName(event.target.value);
    };

    handleFormatChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setFilmFormat(event.value);
    };

    handleIsoChange = event => {
        this.props.setFilmIso(event.target.value);
    };

    handleCodeChange = event => {
        this.props.setFilmCode(event.target.value);
    };

    handleTypeChange = event => {
        this.props.setFilmType(event.value);
    };

    saveFilmStock = () => {
        switch (this.props.modalMode) {
            case "ADD":
                this.saveNewFilmStock();
                return;
            case "EDIT":
                this.editFilmstock();
                return;
            default:
                console.log("ERROR: invalid modal mode ", this.props.modalMode);
        }

    };

    buildRequest = () => {
        return {
            body: {
                filmName: this.props.filmName,
                filmFormat: this.props.filmFormat,
                filmCode: this.props.filmCode,
                iso: this.props.filmIso,
                filmType: this.props.filmType
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
        let hashKeyToEdit = this.props.selectedFilmstockRow.primaryHashKey;
        let rangeKeyToEdit = this.props.selectedFilmstockRow.primaryRangeKey;
        let apiName = config.apiGateway.NAME;
        let editEndpoint = `/filmstock/${hashKeyToEdit}/${rangeKeyToEdit}`;
        console.log(`PUT ${editEndpoint}`);
        API.put(apiName, editEndpoint, this.buildRequest())
            .then(response => {
                this.props.setSelectedFilmstockKey("");
                this.props.setSelectedFilmstockRow({});
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
        if (this.props.filmFormat === "" && this.props.defaultFilmFormats && this.props.defaultFilmFormats.length > 0) {
            this.props.setFilmFormat(this.props.defaultFilmFormats[0].value);
        }
        if (this.props.filmType === "" && this.props.defaultFilmTypes && this.props.defaultFilmTypes.length > 0) {
            this.props.setFilmType(this.props.defaultFilmTypes[0].value);
        }
        return (
        <Modal show={this.props.showModal} onHide={this.dismiss} onExiting={this.props.onExiting}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new film stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormControl
                            autoFocus
                            disabled={this.props.modalMode === "EDIT"}
                            value={this.props.filmName}
                            onChange={this.handleNameChange}
                        />
                        Name
                    </FormGroup>
                    <FormGroup>
                        <Select
                            isDisabled={this.props.modalMode === "EDIT"}
                            options={this.props.defaultFilmFormats}
                            defaultValue={this.props.defaultFilmFormats[0]}
                            onChange={this.handleFormatChange}
                        />
                        Format
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            value={this.props.filmIso}
                            onChange={this.handleIsoChange}
                        />
                        ISO
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            value={this.props.filmCode}
                            onChange={this.handleCodeChange}
                        />
                        Code
                    </FormGroup>
                    <FormGroup>
                        <Select
                            options={this.props.defaultFilmTypes}
                            defaultValue={this.props.defaultFilmTypes[0]}
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

const mapReduxStoreToProps = store => ({
    modalMode: store.filmstocks.modalMode,
    selectedFilmstockRow: store.filmstocks.selectedFilmstockRow,
    showModal: store.filmstocks.showAddFilmstockModal,
    filmStock: store.filmstock.filmStock,
    filmName: store.filmstock.filmName,
    filmFormat: store.filmstock.filmFormat,
    filmIso: store.filmstock.filmIso,
    filmCode: store.filmstock.filmCode,
    filmType: store.filmstock.filmType,
    defaultFilmFormats: store.filmstock.defaultFilmFormats,
    defaultFilmTypes: store.filmstock.defaultFilmTypes
});

const mapDispatchToProps = dispatch => bindActionCreators({
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
}, dispatch);

export default connect(mapReduxStoreToProps, mapDispatchToProps)(AddEditFilmStockModal);
