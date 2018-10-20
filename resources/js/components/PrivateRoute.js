import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        rest.isAuthenticated
            ? <Component {...props} />
            : <Redirect to={'/login/'}/>
    )
    }
    />
);

const mapStateToProps = (state) => ({isAuthenticated: state.isAuthenticated});
export default connect(mapStateToProps)(PrivateRoute);