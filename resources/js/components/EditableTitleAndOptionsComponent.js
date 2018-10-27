import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup, Button} from "react-bootstrap";
import PropTypes from 'prop-types';

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
                        {this.props.answerOptions.map((option, idx) => {
                            return (
                                <div key={idx}>
                                    <FormControl
                                        type='text'
                                        value={this.props.answerOptions[idx]}
                                        onChange={this.props.handleOptionChange(idx)}
                                    />
                                    <Button onClick={this.props.handleDeleteOption(idx)}>Delete</Button>
                                </div>
                            );
                        }, this)}
                    </div>
                </FormGroup>
            </div>
        );
    }
}

EditableTitleAndOptionsComponent.propTypes = {
    title: PropTypes.string,
    handleTitleChange: PropTypes.func,
    answerOptions: PropTypes.arrayOf(PropTypes.string),
    handleOptionChange: PropTypes.func,
    handleDeleteOption: PropTypes.func
};
