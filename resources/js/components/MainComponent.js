import React, {Component} from 'react';
import PollFeedComponent from './PollFeedComponent';

export default class MainComponent extends Component {
    render() {
        return (
            <div>
                <PollFeedComponent />
                <PollSidebarComponent />
            </div>
        )
    }
}

