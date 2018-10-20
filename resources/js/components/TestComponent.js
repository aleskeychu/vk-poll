import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


export default class TestComponent extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Footer/>
            </div>
        )
    }
}