import React, {Component} from 'react';
import {Button, Checkbox, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import EditableTitleAndOptionsComponent from "./EditableTitleAndOptionsComponent";
import PropTypes from 'prop-types';
import {pollType} from "../types";
import update from 'immutability-helper';
import {editPoll} from "../actions";
import {connect} from 'react-redux';
import subbuttonStyle from '../styles/subbutton.css';

class PollBeingEditedComponent extends Component {

    constructor(props) {
        super();

        const option_indeces = props.poll.options.map((option) => {
            return option.index;
        });

        this.state = {
            title: props.poll.title,
            options: props.poll.options,
            emptyTitle: false,
            emptyOptions: false,
            topOptionId: Math.max(...option_indeces)
        }
    }

    handleTitleChange = (e) => {
        const emptyTitle = this.state.emptyTitle === 'error' && e.target.value.trim() === 0 ? 'error' : null;
        this.setState({
            title: e.target.value,
            emptyTitle
        });
    };

    handleOptionChange = (idx) => (e) => {
        const options = this.state.options.slice();
        options[idx].text = e.target.value;
        this.setState({
            options,
            topOptionId: this.state.topOptionId + 1
        });
    };

    handleDeleteOption = (idx) => () => {
        const options = update(this.state.options, {$splice: [[idx, 1]]});
        this.setState({
            options
        });
    };

    handleSubmit = () => {
        if (this.state.title.trim().length === 0) {
            this.setState({emptyTitle: 'error'});
            return;
        }
        const polls = this.state.options.filter(elem => elem.text.trim().length !== 0);
        if (polls.length === 0) {
            this.setState({emptyOptions: 'error'});
            return;
        }
        this.props.onSubmit(
            this.props.poll.id,
            this.state.title,
            this.state.options
        );
        this.props.toggleEditingState();
    };

    handleOptionClick = (idx) => () => {
        const options = this.state.options.slice();
        if (idx + 1 === this.state.options.length && idx + 1 !== 10) {
            options.push({text: '', index: this.state.topOptionId + 1, vote_count: 0});
        }
        this.setState({
            options,
            topOptionId: this.state.topOptionId + 1
        });
    };

    render() {
        const answerOptions = this.state.options.map(elem => elem.text);

        return (
            <div>
                <EditableTitleAndOptionsComponent
                    topTitle='Edit poll'
                    title={this.state.title}
                    answerOptions={answerOptions}
                    handleOptionChange={this.handleOptionChange}
                    handleTitleChange={this.handleTitleChange}
                    handleDeleteOption={this.handleDeleteOption}
                    handleOptionClick={this.handleOptionClick}
                    emptyTitle={this.state.emptyTitle}
                    emptyOptions={this.state.emptyOptions}
                />
                <Button style={subbuttonStyle} onClick={this.props.toggleEditingState}>Cancel</Button>
                <Button style={subbuttonStyle} onClick={this.handleSubmit}>Save</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: editPoll(dispatch)
    };
};

PollBeingEditedComponent.propTypes = {
    poll: PropTypes.shape(pollType),
    toggleEditingState: PropTypes.func
};

export default connect(null, mapDispatchToProps)(PollBeingEditedComponent);