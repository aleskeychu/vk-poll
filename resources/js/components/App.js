import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import TestComponent from './TestComponent';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <TestComponent/>
                </Provider>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<App />, document.getElementById('example'));
}
