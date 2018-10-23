import React, {Component} from 'react';
import FeedContainer from '../containers/FeedContainer';
import SidebarComponent from './SidebarComponent';

export default class MainComponent extends Component {
    render() {
        return (
            <div>
                <FeedContainer />
                <SidebarComponent />
            </div>
        )
    }
}

