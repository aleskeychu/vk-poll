import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {combineReducers} from 'redux';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import TestComponent from './TestComponent';
import reducer from '../reducers';
import {PollCreationStatus} from "../constants/actions_types";

console.log('token ' + window.authToken);

const initialState = {
    polls: [],
    authToken: window.authToken,
    pollCreationStatus: PollCreationStatus.success
};
const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                        <TestComponent />
                </Provider>
            </div>
        );
    }
}

if (document.getElementById('main')) {
    ReactDOM.render(<App/>, document.getElementById('main'));
}
