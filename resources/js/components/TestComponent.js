import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoginComponent from './LoginComponent';
import PrivateRoute from "./PrivateRoute";
import MainComponent from './MainComponent';

export default class TestComponent extends Component {
    render() {
        return (
            <div>
                <Header/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/login' component={LoginComponent}/>
                        <Route path='/vk_callback' component={VkCallbackComponent}
                        <PrivateRoute exact path='/feed' component={MainComponent}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}