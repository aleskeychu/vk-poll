import React, {Component} from 'react';
import Waypoint from 'react-waypoint';
import PollComponent from './PollComponent';
import NewPollAdderComponent from './NewPollAdderComponent';



export default class PollFeedComponent extends Component {

    _loadMoreItems() {
        this.setState({isLoading: true});
        this.props.loadMoreItems();
    }

    _renderNewPollAdder() {
        return (
            <NewPollAdderComponent/>
        )
    }

    _renderItems() {
        return this.state.items(function (poll) {
            return (
                <PollComponent
                    key={poll.id}
                    title={poll.title}
                    options={poll.options}
                    isAnonymous={poll.isAnonymous}
                    isMultianswer={poll.isMultianswer}
                    userVotedFor={poll.userVotedFor}
                />
            );
        });
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