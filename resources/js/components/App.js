import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import VK from 'react-vk';

import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import TestComponent from './TestComponent';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer, null, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <VK apiId={12345}>
                        <BrowserRouter>
                            <TestComponent/>
                        </BrowserRouter>
                    </VK>
                </Provider>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<App/>, document.getElementById('example'));
}
