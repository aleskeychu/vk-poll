import React, {Component} from 'react';
import Waypoint from 'react-waypoint';
import PollInFeedContainer from '../containers/PollInFeedContainer';
import NewPollAdderContainer from '../containers/NewPollAdderContainer';
import PropTypes from 'prop-types';
import {pollType} from '../types';
import center from '../styles/center.css';
import feed from '../styles/feed.css';

export default class FeedComponent extends Component {

    state = {
        isLoading: false
    };

    _loadMoreItems = () => {
        const idx = this.props.polls.length === 0 ? null : this.props.polls[this.props.polls.length - 1].id;
        this.props.loadMoreItems(idx); // id of last poll in the feed
    };

    _renderNewPollAdder() {
        return (
            <NewPollAdderContainer/>
        )
    }

    _renderItems() {
        return this.props.polls.map(function (poll) {
            return (
                <PollInFeedContainer
                    key={poll.id}
                    poll={poll}
                />
            );
        }, this);
    }

    _renderWaypoint() {
        if (this.state.isLoading) {
            // TODO return 'Loading' component
        }
        else {
            return (
                <Waypoint
                    style={{height: '10px'}}
                    onEnter={this._loadMoreItems}
                />
            );
        }
    }

    render() {
        return (
            <div style={{...center, ...feed}}>
                {this._renderNewPollAdder()}
                {this._renderItems()}
                {this._renderWaypoint()}
            </div>
        )
    }
}

FeedComponent.propTypes = {
    polls: PropTypes.arrayOf(PropTypes.shape(pollType)),
    currentUserId: PropTypes.number,
    loadMoreItems: PropTypes.func
};