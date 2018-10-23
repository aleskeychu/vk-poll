import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        rest.authToken !== ''
            ? <Component {...props} />
            : <Redirect to={'/login/'}/>
    )
    }
    />
);

const mapStateToProps = (state) => ({authToken: state.authToken});
export default connect(mapStateToProps)(PrivateRoute);