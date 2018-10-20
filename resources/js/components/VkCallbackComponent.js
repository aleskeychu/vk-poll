import React, {Component} from 'react';
import * as qs from 'query-string';

export default class VkCallbackComponent extends Component {
    constructor(props) {
        super();
        const response_params = qs.parse(this.props.location.query);
        
    }

    render() {

    }
}