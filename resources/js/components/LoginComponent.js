import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//TODO refactor to fetch url from env
const vk_url = 'https://oauth.vk.com/authorize?client_id=6727304&redirect_uri=http://142.93.238.101:8000/vkcallback';

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