import 'tslib';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Amplify from "aws-amplify";

import './index.css';
import App from './App';
import Login from './containers/Login';
import config from "./config";
import configureStore from './store';
import NotFound from './containers/NotFound';
import Film from './containers/Film';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.DATA_BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: config.apiGateway.NAME,
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            }
        ]
    }
});

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/film" component={Film} />
                <Route component={NotFound}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
