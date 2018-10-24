import React, {Component} from 'react';
import {Label, Button} from 'react-bootstrap';
import PollComponent from './PollComponent';
import PollBeingEditedComponent from './PollBeingEditedComponent';

export default class PollInFeedComponent extends Component {

    state = {
        isBeingEdited: false
    };

    onEdit = () => {
        this.setState({
            isBeingEdited: true
        });
    };

    onSubmit = () => {

    };

    onCancel = () => {
        this.setState({
            isBeingEdited: false
        });
    };

    render() {
        return this.state.isBeingEdited
            ? (
                <PollBeingEditedComponent
                    {...this.props}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            )
            : (
                <PollComponent
                    {...this.props}
                    onEdit={this.onEdit}
                />
            )
        ;
    }
}