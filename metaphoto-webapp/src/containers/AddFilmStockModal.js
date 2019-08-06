import React from 'react';
import {API} from "aws-amplify";
import {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    addFilmStock,
    setFilmName,
    setFilmFormat,
    setFilmIso,
    setFilmCode,
    setFilmType,
    setShowAddFilmstockModal
} from '../actions/actions';
import Button from "react-bootstrap/es/Button";
import Modal from "react-bootstrap/es/Modal";
import {Form} from "react-bootstrap";
import {FormControl} from "react-bootstrap";
import {FormGroup} from "react-bootstrap";

import config from '../config';


class AddFilmStockModal extends Component {

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

    handleNameChange = event => {
        this.props.setFilmName(event.target.value);
    };

    handleFormatChange = event => {
        this.props.setFilmFormat(event.target.value);
    };

    handleIsoChange = event => {
        this.props.setFilmIso(event.target.value);
    };

    handleCodeChange = event => {
        this.props.setFilmCode(event.target.value);
    };

    handleTypeChange = event => {
        this.props.setFilmType(event.target.value);
    };


    handleSubmit = event => {
        console.log("in handleSubmit(): ", event);
    };

    saveFilmStock = arg => {
        console.log("in saveFilmStock()", arg);
        let messages = this.validate();
        if (messages.length > 0) {
            alert("Please specify" + messages);
            return;
        }
        let request = {};
        request.body = {
            filmName: this.props.filmName,
            filmFormat: this.props.filmFormat,
            filmCode: this.props.filmCode,
            iso: this.props.filmIso,
            filmType: this.props.filmType
        };
        let postFilmStocks = "/filmstock";
        API.post(config.apiGateway.NAME, postFilmStocks,request)
            .then(response => {
                console.log("POST response:", response);
                this.dismiss();
            })
            .catch( err => {
                console.log(err);
                let errorString = "POST error: ";
                if (err.response) {
                    errorString += `${err.response.status}: ${err.response.data}`;
                } else if (err.message) {
                    errorString += err.message;
                }
                console.log(errorString);
                alert(errorString)
            })
    };

    dismiss = () => {
        this.props.setShowAddFilmstockModal(false);
    };

    render() {
        console.log("in modal render()");
        console.log("defaults:", this.props.defaults)
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
                            value={this.props.filmName}
                            onChange={this.handleNameChange}
                        />
                        Name
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            autoFocus
                            value={this.props.filmFormat}
                            onChange={this.handleFormatChange}
                        />
                            Format
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            autoFocus
                            value={this.props.filmIso}
                            onChange={this.handleIsoChange}
                        />
                            ISO
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            autoFocus
                            value={this.props.filmCode}
                            onChange={this.handleCodeChange}
                        />
                            Code
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            autoFocus
                            value={this.props.filmType}
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
    filmStock: store.filmstock.filmStock,
    showModal: store.filmstocks.showAddFilmstockModal,
    filmName: store.filmstock.filmName,
    filmFormat: store.filmstock.filmFormat,
    filmIso: store.filmstock.filmIso,
    filmCode: store.filmstock.filmCode,
    filmType: store.filmstock.filmType
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addFilmStock,
    setFilmName,
    setFilmFormat,
    setFilmIso,
    setFilmCode,
    setFilmType,
    setShowAddFilmstockModal
}, dispatch);

export default connect(mapReduxStoreToProps, mapDispatchToProps)(AddFilmStockModal);
