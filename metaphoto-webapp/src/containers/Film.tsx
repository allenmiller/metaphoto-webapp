import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import {
    setFilmstockId
} from "../store/film/actions";

import {AppState} from '../store';

type FilmProps = Readonly<{
    film: {
        filmstockId: string
    },
    setFilmstockId: typeof setFilmstockId
}>

class Film extends Component<FilmProps> {
    componentDidMount() {
        this.props.setFilmstockId("abc");
    }
    render() {
        return (
            <div>
                <p>hello {this.props.film.filmstockId}</p>
            </div>
                );
    }
}

const mapReduxStoreToProps = (state:AppState, routeProps: RouteComponentProps) => ({
    film : {
        filmstockId: state.film.filmstockId
    }
});

const mapDispatchToProps = {
    setFilmstockId
}

export default withRouter(connect(mapReduxStoreToProps, mapDispatchToProps)(Film));
