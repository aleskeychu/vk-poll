import React, {Component} from 'react';
import {Checkbox, Button, Row} from 'react-bootstrap';
import EditableTitleAndOptionsComponent from "./EditableTitleAndOptionsComponent";
import PropTypes from 'prop-types';
import {PollCreationStatus} from "../constants/actions_types";
import aligner from '../styles/aligner.css';
import card from '../styles/card.css'
import button from '../styles/button.css';
import checkboxText from '../styles/checkboxText.css';

export default class NewPollAdderComponent extends Component {

    state = {
        title: '',
        answerOptions: ['', ''],
        isLoading: false,
        isAnonymous: false,
        isMultianswer: false,
        emptyTitle: null,
        emptyOptions: null,

    };

    resetState = () => {
        this.setState({
            title: '',
            answerOptions: ['', ''],
            isLoading: false,
            emptyTitle: null,
            emptyOptions: null,
        })
    };

    createPost = () => {
        if (this.state.title.trim().length === 0) {
            this.setState({emptyTitle: true});
            return;
        }
        const polls = this.state.answerOptions.filter(value => value.trim().length !== 0);
        if (polls.length === 0) {
            this.setState({emptyOptions: true});
            return;
        }
        this.props.createPoll(
            this.state.title,
            polls,
            this.state.isMultianswer,
            this.state.isAnonymous,
            this.resetState
        );
    };

    onAnonymousToggle = (e) => {
        this.setState({
            isAnonymous: !this.state.isAnonymous
        });
    };

    onMultianswerToggle = (e) => {
        this.setState({
            isMultianswer: !this.state.isMultianswer
        });
    };

    handleTitleChange = (e) => {
        const emptyTitle = this.state.emptyTitle && e.target.value.trim() === 0 ? true : null;
        this.setState({
            title: e.target.value,
            emptyTitle
        });
    };

    handleOptionChange = (idx) => (e) => {
        const options = this.state.answerOptions.slice();
        options[idx] = e.target.value;
        this.setState({answerOptions: options});
    };

    handleDeleteOption = (idx) => () => {
        const options = this.state.answerOptions.slice();
        options.splice(idx, 1);
        this.setState({answerOptions: options})
    };

    handleOptionClick = (idx) => () => {
        const options = this.state.answerOptions.slice();
        if (idx + 1 === this.state.answerOptions.length && idx + 1 !== 10) {
            options.push('');
        }
        this.setState({answerOptions: options});
    };

    getValidationState = () => {
        const res = this.state.emptyOptions || this.state.emptyTitle;
        console.log(res);
        return res;
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div style={{...aligner, ...card}}>
                <EditableTitleAndOptionsComponent
                    topTitle='Create new poll'
                    title={this.state.title}
                    answerOptions={this.state.answerOptions}
                    handleTitleChange={this.handleTitleChange}
                    handleOptionChange={this.handleOptionChange}
                    handleDeleteOption={this.handleDeleteOption}
                    handleOptionClick={this.handleOptionClick}
                    emptyTitle={this.state.emptyTitle}
                    emptyOptions={this.state.emptyOptions}
                />
                <div>
                    <Row>
                        <Checkbox value={this.state.isMultianswer} onClick={this.onMultianswerToggle}/>
                        <div style={checkboxText}>Choose multiple options</div>
                    </Row>
                    <Row>
                        <Checkbox value={this.state.isAnonymous} onClick={this.onAnonymousToggle}/>
                        <div style={checkboxText}>Anonymous poll</div>
                    </Row>
                </div>
                <Button
                    disabled={isLoading}
                    onClick={isLoading ? null : this.createPost}
                    style={button}
                > Create </Button>
            </div>
        );
    }
}

NewPollAdderComponent.propTypes = {
    createPoll: PropTypes.func,
    creationStatus: PropTypes.oneOf([
        PollCreationStatus.error,
        PollCreationStatus.creating,
        PollCreationStatus.success
    ])
};