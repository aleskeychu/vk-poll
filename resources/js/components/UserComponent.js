import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {userType} from "../types";

export default class UserComponent extends Component {
    vk_url = 'https://vk.com/';

    static convertTimezone(time) {
        const datetimeThisTimezone = new Date(time.replace(' ', 'T'));
        const offset = datetimeThisTimezone.getTimezoneOffset();
        const datetime = new Date(datetimeThisTimezone.getTime() - offset * 60000);
        return datetime.getFullYear() + '-' + (datetime.getMonth() + 1)
            + '-' + datetime.getDate() + ' ' + datetime.getHours() + ':' + datetime.getMinutes();
    }

    render() {
        // get rid of seconds
        let style;
        if (this.props.nameAtBottom) {
            style = {display: 'flex', alignItems: 'center', flexDirection: 'column'}
        } else {
            style = {display: 'flex', alignItems: 'center'};
        }
        let datetimeString;
        if (this.props.creationTime !== undefined) {
            datetimeString = UserComponent.convertTimezone(this.props.creationTime);
        } else {
            datetimeString = '';
        }
        return (
            <div style={style}>
                <a href={this.vk_url + this.props.user.domain}>
                    <img style={{borderRadius: '50%'}} src={this.props.user.image_50}/>
                </a>
                <div style={{display: 'flex', flexDirection: 'column', margin: '0 5px'}}>
                    <div style={{margin: '0 5px'}}>
                        {this.props.user.first_name + ' ' + this.props.user.second_name}
                    </div>
                    <div>
                        {datetimeString}
                    </div>
                </div>
            </div>
        );
    }
}

UserComponent.propTypes = {
    user: PropTypes.shape(userType).isRequired,
    creationTime: PropTypes.string
};
