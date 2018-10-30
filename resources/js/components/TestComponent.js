import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginComponent from './LoginComponent';
import PrivateRoute from "./PrivateRoute";
import MainComponent from './MainComponent';

export default class TestComponent extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/login' component={LoginComponent}/>
                        <PrivateRoute exact path='/feed' component={MainComponent}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}