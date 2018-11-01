import React, {Component} from 'react';
import stickySidebar from '../styles/stickySidebar.css';
import {connect} from 'react-redux';
import UserComponent from "./UserComponent";
import {Button} from 'react-bootstrap';

class SidebarComponent extends Component {
    logout = () => {
        window.localStorage.setItem('jwtToken', '');
        window.location.href = '/login';
    };

    render() {
        return (
            <div style={stickySidebar}>
                <div style={{fontWeight: 'bold'}}>Logged in as</div>
                <UserComponent user={this.props.user}/>
                <Button onClick={this.logout}>Log out</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(SidebarComponent);
