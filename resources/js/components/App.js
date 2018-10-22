import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import VK from 'react-vk';

import {combineReducers} from 'redux';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import TestComponent from './TestComponent';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const initialState = {
    authToken: window.authToken,
    isAuthenticated: window.authToken !== null
};
const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <VK apiId={12345}>
                        <TestComponent />
                    </VK>
                </Provider>
            </div>
        );
    }
}

if (document.getElementById('main')) {
    ReactDOM.render(<App/>, document.getElementById('example'));
}
