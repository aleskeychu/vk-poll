import React, {Component} from 'react';
import {Button, Checkbox, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import EditableTitleAndOptionsComponent from "./EditableTitleAndOptionsComponent";

export default class PollBeingEditedComponent extends Component {

    constructor(props) {
        super();

        this.state = {
            title: props.title,
            options: this.props.options,
            emptyTitle: false,
            emptyOption: false,
            topOptionId: this.props.topOptionId
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
        const options = this.state.answerOptions.slice();
        options[idx].text = e.target.value;
        if (idx + 1 === this.state.answerOptions.length && idx + 1 !== 10) {
            options.push({text: '', id: this.state.topOptionId + 1, count: 0});
        }
        this.setState({
            options,
            topOptionId: this.state.topOptionId + 1
        });
    };

    handleDeleteOption = (idx) => () => {
        const options = this.state.answerOptions.slice();
        options.splice(idx, 1);
        this.setState({answerOptions: options})
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

        this.editPoll(
            this.props.id,
            this.state.title,
            this.state.options
        );
    };

    render() {
        const answerOptions = this.state.options.map(elem => elem.text);

        return (
            <div>
                <EditableTitleAndOptionsComponent
                    title={this.state.title}
                    answerOptions={answerOptions}
                    handleOptionChange={this.handleOptionChange}
                    handleTitleChange={this.handleTitleChange}
                />
                <Button onClick={this.props.onCancel}>Cancel</Button>
                <Button onClick={this.handleSubmit}>Save</Button>
            </div>
        )
    }
}