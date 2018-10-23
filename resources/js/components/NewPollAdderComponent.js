import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap';

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
            this.state.isAnonymous
        );
    };

    onAnonymousToggle = (e) => {
        this.setState({
            isAnonymous: e.target.checked
        });
    };

    onMultianswerToggle = (e) => {
        this.setState({
            isMultianswer: e.target.checked
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
        const options = this.state.answerOptions;
        options[idx] = e.target.value;
        if (idx + 1 === this.state.answerOptions.length && idx + 1 !== 10) {
            options.push('');
        }
        this.setState({answerOptions: options});
    };

    attachMultianswerCheckbox = (elem) => {
        elem.onclick = this.onMultianswerToggle;
    };

    attachAnonymousRadio = (elem) => {
        elem.onclick = this.onAnonymousToggle;
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div>
                <FormGroup
                    controlId='newPoll'
                >
                    <ControlLabel>Create new poll</ControlLabel>
                    <FormControl
                        type='text'
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <div>
                        {this.state.answerOptions.map((option, idx) => {
                            return (
                                <FormControl
                                    key={idx}
                                    type='text'
                                    value={this.state.answerOptions[idx]}
                                    onChange={this.handleOptionChange(idx)}
                                />
                            );
                        })}
                    </div>
                    <div>
                        <Checkbox inputRef={this.attachMultianswerCheckbox}>
                            Choose multiple options
                        </Checkbox>
                        <Checkbox inputRef={this.attachAnonymousRadio}>
                            Anonymous poll
                        </Checkbox>
                    </div>
                    <Button disabled={isLoading} onClick={isLoading ? null : this.createPost}>Create</Button>
                </FormGroup>
            </div>
        );
    }
}