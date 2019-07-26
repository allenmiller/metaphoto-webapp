import React, { Component } from "react";
import "./Home.css";
import config from '../config';

import { API } from "aws-amplify";
import { bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { setTime } from '../actions/actions';

class Home extends Component {

    constructor(props) {
        super(props);
        this.getTime();
    }

    getTime()  {
        let apiName = config.apiGateway.NAME;
        let apiPath = "/time";
        let myInit = {};
        API.get(apiName, apiPath, myInit)
            .then(response => {
                this.setState({time: response.data});
            })
            .catch(error => {
                console.log(error);
                this.setState({time: error.message});
            });
    };

    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Metaphoto</h1>
                    <p>Keep track of all that photographic metadata</p>
                    <p>{this.props.time}</p>
                </div>
            </div>
        );
    }
}

const mapReduxStoreToProps = store => ({
   time: store.time
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setTime
}, dispatch);

export default connect(mapReduxStoreToProps, mapDispatchToProps)(Home)
