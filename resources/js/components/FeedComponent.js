import React, {Component} from 'react';
import Waypoint from 'react-waypoint';
import PollComponent from './PollComponent';
import NewPollAdderContainer from '../containers/NewPollAdderContainer';



export default class FeedComponent extends Component {

    state = {
        isLoading: false
    };

    _loadMoreItems = () => {
        this.setState({isLoading: true});
        this.props.loadMoreItems(this.props.polls.length); // offset
    };

    _renderNewPollAdder() {
        return (
            <NewPollAdderContainer/>
        )
    }

    _renderItems() {
        return this.props.polls.map(function (poll) {
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