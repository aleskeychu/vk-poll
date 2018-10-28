import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {userType} from "../types";

export default class UserComponent extends Component {
    vk_url = 'https://vk.com/';

    render() {
        // get rid of seconds
        const t = this.props.creationTime;
        const time = t.substring(0, t.lastIndexOf(':'));
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <a href={this.vk_url + this.props.user.domain}><img style={{borderRadius: '50%'}} src={this.props.user.image_50}/></a>
                <div style={{display: 'flex', flexDirection: 'column', margin: '0 5px'}}>
                    <div style={{margin: '0 5px'}}>
                        {this.props.user.first_name + ' ' + this.props.user.second_name}
                    </div>
                    <div>
                        {time}
                    </div>
                </div>
            </div>
        );
    }
}

UserComponent.propTypes = {
    user: PropTypes.shape(userType).isRequired,
    creationTime: PropTypes.string.isRequired
};
