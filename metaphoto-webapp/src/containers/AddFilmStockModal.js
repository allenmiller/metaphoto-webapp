import React from 'react';
import {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addFilmStock, setFilmname, setShowAddFilmstockModal} from '../actions/actions';
import Button from "react-bootstrap/es/Button";
import Modal from "react-bootstrap/es/Modal";
import Form from "react-bootstrap/Form";


class AddFilmStockModal extends Component {

    validate = newFilmstock => {
        return false;
    };

    handleChange = event => {
        console.log("in handleChange()", event.target.value);
        this.props.setFilmname(event.target.value);
    };

    handleSubmit = event => {
        console.log("in handleSubmit(): ", event);
    };

    saveFilmStock = arg => {
        console.log("in saveFilmStock()", arg);
        if (!this.validate()) {
            console.log("validation failed");
            alert("validaiton failed");
        }
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
                <Form>
                    <Form.Group>
                        <Form.Control
                            autoFocus
                            placeholder="Film Name"
                            value={this.props.filmName}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-muted">
                            Film name
                        </Form.Text>
                    </Form.Group>
                    <Button onClick={this.saveFilmStock}>Submit</Button>
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
    filmName: store.filmstock.filmName
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addFilmStock,
    setFilmname,
    setShowAddFilmstockModal
}, dispatch);

export default connect(mapReduxStoreToProps, mapDispatchToProps)(AddFilmStockModal);
