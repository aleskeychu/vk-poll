import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import TestComponent from './TestComponent';
import reducer from '../reducers';
import {PollCreationStatus} from "../constants/actions_types";


const jwtToken = window.localStorage.getItem('jwtToken');
const userId = window.localStorage.getItem('userId');

const initialState = {
    polls: [
        // id: 12345,
        // title: 'Title',
        // options: [{id: 1, text: 'option 1', count: 5}, {id: 2, text: 'option 2', count: 3}, {id: 3, text: 'option 3', count: 7}],
        // isAnonymous: false,
        // isMultianswer: false,
        // userVotedFor: -1,
        // user_id: 1,
        // topOptionId: 3, // for option order
    ],
    pollCreationStatus: PollCreationStatus.success,
    user: {
        isAuthenticated: jwtToken !== '',
        id: parseInt(userId, 10)
    }
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
