import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup, Button} from "react-bootstrap";

export default class EditableTitleAndOptionsComponent extends Component {

    render() {
        return (
            <div>
                <FormGroup
                    controlId='newPoll'
                >
                    <ControlLabel>Create new poll</ControlLabel>
                    <FormControl
                        type='text'
                        value={this.props.title}
                        onChange={this.props.handleTitleChange}
                    />
                    <div>
                        {this.state.answerOptions.map((option, idx) => {
                            return (
                                <div>
                                    <FormControl
                                        key={idx}
                                        type='text'
                                        value={this.props.answerOptions[idx]}
                                        onChange={this.props.handleOptionChange(idx)}
                                    />
                                    <Button onClick={this.props.handleDeleteOption(idx)}>Delete</Button>
                                </div>
                            );
                        })}
                    </div>
                </FormGroup>
            </div>
        );
    }
}

