import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import PollComponent from '../components/PollComponent';
import PollBeingEditedComponent from '../components/PollBeingEditedComponent';
import {editPoll, deletePoll, vote, unvote} from "../actions";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {pollType} from "../types";
import update from 'immutability-helper';

import card from '../styles/card.css';
import aligner from '../styles/aligner.css';

class PollInFeedContainer extends Component {

    state = {
        isBeingEdited: false,
        optionsToVoteFor: []
    };

    onEdit = () => {
        this.setState({
            isBeingEdited: true
        });
    };

    toggle = () => {
        this.setState({
           isBeingEdited: !this.state.isBeingEdited
        });
    };

    onDelete = () => {
        this.props.onDelete(this.props.poll.id);
    };

    onVoteSingle = (poll_id, option_id, user_id) => () => {
        console.log('wtf');
        this.props.onVote(poll_id, [option_id], user_id);
    };

    onVoteMulti = (poll_id, option_id, _) => () => {
        const arrayIndex = this.state.optionsToVoteFor.findIndex(option_index => option_index === option_id);
        let state;
        if (arrayIndex !== -1) {
            state = update(this.state, {optionsToVoteFor: {$splice: [[arrayIndex, 1]]}});
        } else {
            state = update(this.state, {optionsToVoteFor: {$push: [option_id]}});
        }
        this.setState(state);
    };

    onMultiSubmit = () => {
        this.props.onVote(this.props.poll.id, this.state.optionsToVoteFor, this.props.userId);
        this.setState({
            optionsToVoteFor: []
        });
    };

    onUnvote = () => {
        this.props.onUnvote(this.props.poll.id);
    };

    render() {
        const onVote = this.props.poll.is_multianswer ? this.onVoteMulti : this.onVoteSingle;
        let elem = this.state.isBeingEdited
            ? (<Grid>
                    <PollBeingEditedComponent
                        poll={this.props.poll}
                        toggleEditingState={this.toggle}
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
                        onVote={onVote}
                        onUnvote={this.onUnvote}
                        optionsToVoteFor={this.state.optionsToVoteFor}
                        onMultiSubmit={this.onMultiSubmit}
                    />
                </Grid>
            )
            ;
        return (<div style={card}>{elem}</div>);
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: deletePoll(dispatch),
        onSubmit: editPoll(dispatch),
        onVote: vote(dispatch),
        onUnvote: unvote(dispatch)
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