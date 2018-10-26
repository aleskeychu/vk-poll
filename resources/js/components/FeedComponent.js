import React, {Component} from 'react';
import Waypoint from 'react-waypoint';
import PollInFeedContainer from '../containers/PollInFeedContainer';
import NewPollAdderContainer from '../containers/NewPollAdderContainer';



export default class FeedComponent extends Component {

    state = {
        isLoading: false
    };

    _loadMoreItems = () => {
        this.setState({isLoading: true});
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
                    id={poll.id}
                    title={poll.title}
                    options={poll.options}
                    isAnonymous={poll.isAnonymous}
                    isMultianswer={poll.isMultianswer}
                    userVotedFor={poll.userVotedFor}
                    totalCount={poll.totalCount}
                    creatorIsCurrentUser={poll.user_id === this.props.userId}
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
                    onEnter={this._loadMoreItems}
                    threshold={2.0}
                />
            );
        }
    }

    render() {
        return (
            <div>
                {this._renderNewPollAdder()}
                {this._renderItems()}
                {this._renderWaypoint()}
            </div>
        )
    }
}