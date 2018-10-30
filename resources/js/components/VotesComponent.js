import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {VOTE_URL} from "../constants/api_urls";
import UserComponent from "./UserComponent";
import {Button} from 'react-bootstrap';
import subbutton from '../styles/subbutton.css';
import titleStyle from '../styles/title.css';
import subtitleStyle from '../styles/subtitle.css';

const axios = require('axios');

export default class VotesComponent extends Component {

    state = {
        votes: []
    };

    componentDidMount() {
        this.fetchVotes();
    }


    // refactor to redux store
    fetchVotes = () => {
        axios.get(VOTE_URL + '/' + this.props.poll_id + '?vote_id=' + this.props.option_id, {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('jwtToken'),
            }
        })
            .then((response) => {
                this.setState({votes: response.data});
            })
            .catch(error => {
            });
    };

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div style={titleStyle}>{this.props.title}</div>
                <div style={subtitleStyle}>People who voted for
                    <span style={{fontWeight: 'bold'}}> "{this.props.option_text}"</span>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>{
                    this.state.votes.map((vote) => {
                        return <UserComponent key={vote.id} user={vote} nameAtBottom={true}/>
                    })}
                </div>
                <Button style={subbutton} onClick={this.props.goBack}>back</Button>
            </div>
        );
    }
}

VotesComponent.propTypes = {
    poll_id: PropTypes.number.isRequired,
    option_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    option_text: PropTypes.string.isRequired,
    goBack: PropTypes.func.isRequired
};