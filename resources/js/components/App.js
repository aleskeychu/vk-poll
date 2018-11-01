import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import TestComponent from './TestComponent';
import reducer from '../reducers';
import {PollCreationStatus} from "../constants/actions_types";
import background from '../styles/background.css';

const jwtToken = window.localStorage.getItem('jwtToken');
const userId = window.localStorage.getItem('userId');
const initialState = {
    polls: [
    ],
    pollCreationStatus: PollCreationStatus.success,
    user: {
        isAuthenticated: jwtToken !== '' && jwtToken !== null,
        id: parseInt(userId, 10),
        first_name: window.localStorage.getItem('name'),
        second_name: window.localStorage.getItem('surname'),
        image_50: window.localStorage.getItem('pic'),
        domain: window.localStorage.getItem('domain')
    }
};
const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <div style={background}>
                <Provider store={store}>
                        <TestComponent/>
                </Provider>
            </div>
        );
    }
}

if (document.getElementById('main')) {
    ReactDOM.render(<App/>, document.getElementById('main'));
}
