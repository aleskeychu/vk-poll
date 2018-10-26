import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import PollComponent from '../components/PollComponent';
import PollBeingEditedComponent from '../components/PollBeingEditedComponent';
import {editPoll, deletePoll} from "../actions";
import {connect} from 'react-redux';

class PollInFeedContainer extends Component {

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

    onDelete = () => {
        this.props.onDelete(this.props.id);
    };

    render() {
        return this.state.isBeingEdited
            ? (<Grid>
                    <PollBeingEditedComponent
                        {...this.props}
                        onSubmit={this.onSubmit}
                        onCancel={this.onCancel}
                    />
                </Grid>
            )
            : (
                <Grid>
                    <PollComponent
                        {...this.props}
                        onEdit={this.onEdit}
                        onDelete={this.onDelete}
                    />
                </Grid>
            )
            ;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: dispatch(deletePoll),
        onSubmit: dispatch(editPoll),
    };
};

export default connect(null, mapDispatchToProps)(PollInFeedContainer);