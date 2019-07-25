import React, { Component } from "react";
import "./Home.css";
import config from '../config';

import Amplify, { API } from "aws-amplify";

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
         const apiConfig = {
            API: {
                endpoints: [
                    {
                        name: config.apiGateway.NAME,
                        endpoint: config.apiGateway.URL
                    }
                ]
            }
        };
        Amplify.configure(apiConfig);
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
                this.setState({secureTime: error});
            });
        API.get(apiName, secureApiPath, myInit)
            .then(response => {
                this.setState({secureTime: response.data});
            })
            .catch(error => {
                console.log(error);
                this.setState({secureTime: error});
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
