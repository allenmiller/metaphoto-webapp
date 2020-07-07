import React, { Component } from "react";

import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {
    setFilmstockId
} from "../actions/film";


class FilmStocks extends Component {

    render() {

        return (
            <div>
                <p>hello</p>
            </div>
                );
    }
}

const mapReduxStoreToProps = store => ({
    filmstockId: store.film.filmstockId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setFilmstockId
}, dispatch);

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(FilmStocks));
