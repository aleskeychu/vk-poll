import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

//TODO change client_id to real id
const vk_url = 'https://oauth.vk.com/authorize?client_id=6727304&redirect_uri=http://localhost:8000/vkcallback';

const redirectToVK = () => {
    window.location.href = vk_url;
};

class LoginComponent extends Component {
    render() {
        return this.props.isAuthenticated
            ? (
                <Redirect to='/feed'/>

            )
            : (
                <div>
                    <Button onClick={redirectToVK}/>
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    };
};

export default connect(mapStateToProps)(LoginComponent);