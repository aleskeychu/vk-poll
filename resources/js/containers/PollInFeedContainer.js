import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import PollComponent from '../components/PollComponent';
import PollBeingEditedComponent from '../components/PollBeingEditedComponent';
import {editPoll, deletePoll, vote} from "../actions";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {pollType} from "../types";

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
        this.props.onDelete(this.props.poll.id);
    };

    onVote = (poll_id, option_id, user_id) => () => {
        this.props.onVote(poll_id, option_id, user_id);
    };

    render() {
        return this.state.isBeingEdited
            ? (<Grid>
                    <PollBeingEditedComponent
                        {...this.props.poll}
                        onSubmit={this.onSubmit}
                        onCancel={this.onCancel}
                    />
                </Grid>
            )
            : (
                <Grid>
                    <PollComponent
                        poll={this.props.poll}
                        userId={this.props.userId}
                        onEdit={this.onEdit}
                        onDelete={this.onDelete}
                        onVote={this.onVote}
                    />
                </Grid>
            )
            ;
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: deletePoll(dispatch),
        onSubmit: editPoll(dispatch),
        onVote: vote(dispatch),
    };
};

PollInFeedContainer.propTypes = {
    userId: PropTypes.number,
    poll: PropTypes.shape(pollType),
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func,
    onVote: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(PollInFeedContainer);