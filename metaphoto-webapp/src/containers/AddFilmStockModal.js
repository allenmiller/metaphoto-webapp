import React from 'react';
import {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addFilmStock, setShowAddFilmstockModal} from '../actions/actions';
import Button from "react-bootstrap/es/Button";
import Modal from "react-bootstrap/es/Modal";


class AddFilmStockModal extends Component {


    saveFilmStock = () => {
        console.log("in saveFilmStock()");
    };

    dismiss = () => {
        this.props.setShowAddFilmstockModal(false);
    };

    render() {
        console.log("in modal render()");
        return (
        <Modal show={this.props.showModal}>
            <Modal.Body>
                Add data here
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
    showModal: store.filmstocks.showAddFilmstockModal
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addFilmStock,
    setShowAddFilmstockModal
}, dispatch);

export default connect(mapReduxStoreToProps, mapDispatchToProps)(AddFilmStockModal);
