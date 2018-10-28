import React, {Component} from 'react';
import {Checkbox, Button} from 'react-bootstrap';
import EditableTitleAndOptionsComponent from "./EditableTitleAndOptionsComponent";
import PropTypes from 'prop-types';
import {PollCreationStatus} from "../constants/actions_types";

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
        console.log("createPost");
        if (this.state.title.trim().length === 0) {
            this.setState({emptyTitle: 'error'});
            return;
        }
        const polls = this.state.answerOptions.filter(value => value.trim().length !== 0);
        if (polls.length === 0) {
            this.setState({emptyOptions: 'error'});
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
        const emptyTitle = this.state.emptyTitle === 'error' && e.target.value.trim() === 0 ? 'error' : null;
        this.setState({
            title: e.target.value,
            emptyTitle
        });
    };

    handleOptionChange = (idx) => (e) => {
        console.log('hello');
        const options = this.state.answerOptions.slice();
        options[idx] = e.target.value;
        if (idx + 1 === this.state.answerOptions.length && idx + 1 !== 10) {
            options.push('');
        }
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

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div>
                <EditableTitleAndOptionsComponent
                    title={this.state.title}
                    answerOptions={this.state.answerOptions}
                    handleTitleChange={this.handleTitleChange}
                    handleOptionChange={this.handleOptionChange}
                    handleDeleteOption={this.handleDeleteOption}
                    handleOptionClick={this.handleOptionClick}
                />
                <Checkbox value={this.state.isMultianswer} onClick={this.onMultianswerToggle}>
                    Choose multiple options
                </Checkbox>
                <Checkbox value={this.state.isAnonymous} onClick={this.onAnonymousToggle}>
                    Anonymous poll
                </Checkbox>
                <Button
                    disabled={isLoading}
                    onClick={isLoading ? null : this.createPost}> Create </Button>
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