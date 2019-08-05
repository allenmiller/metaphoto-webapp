import React from 'react';
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



class AddFilmStockModal extends Component {

    validate = newFilmstock => {
        console.log(newFilmstock);
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
        }
    };

    dismiss = () => {
        this.props.setShowAddFilmstockModal(false);
    };

    render() {
        console.log("in modal render()");
        return (
        <Modal show={this.props.showModal} onHide={this.dismiss}>
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
