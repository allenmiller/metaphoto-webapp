import React, { Component } from "react";
import "./Home.css";
import config from '../config';

import { API } from "aws-amplify";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: "Initial time",
            secureTime: "Initial secure time"
        };
        this.getTime();
    }

    getTime()  {
        let apiName = config.apiGateway.NAME;
        let apiPath = "/time";
        let secureApiPath = "/timesecure";
        let myInit = {};
        API.get(apiName, apiPath, myInit)
            .then(response => {
                this.setState({time: response.data});
            })
            .catch(error => {
                console.log(error);
                this.setState({time: error.message});
            });
        API.get(apiName, secureApiPath, myInit)
            .then(response => {
                this.setState({secureTime: response.data});
            })
            .catch(error => {
                console.log(error);
                this.setState({secureTime: error.message});
            })
        ;
    };

    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Metaphoto</h1>
                    <p>Keep track of all that photographic metadata</p>
                    <p>{this.state.time}</p>
                    <p>{this.state.secureTime}</p>
                </div>
            </div>
        );
    }
}
