import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//TODO change client_id to real id
const vk_url = 'https://oauth.vk.com/authorize?client_id=6727304&redirect_uri=http://localhost:8000/vkcallback';

class LoginComponent extends Component {
    render() {
        return this.props.isAuthenticated
            ? (
                <Redirect to='/feed'/>
            )
            : (
                <div style={{position: 'fixed', top: '50%', left: '50%'}}>
                    <a href={vk_url} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img src='https://www.drupal.org/files/project-images/vkontakte-256.png' height='42' width='42'/>
                        <div>
                            Login via VK
                        </div>
                    </a>
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
};

LoginComponent.propTypes = {
    isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps)(LoginComponent);