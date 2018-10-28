import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup, Button} from "react-bootstrap";
import PropTypes from 'prop-types';
import center from '../styles/center.css';
import alignHorizontally from '../styles/alignHorizontally.css';
import componentStyle from '../styles/editableTitleAndOptionsComponent.css';
import subbuton from '../styles/subbutton.css';
import optionStyle from '../styles/options.css';


export default class EditableTitleAndOptionsComponent extends Component {

    render() {
        return (
            <div style={componentStyle}>
                <FormGroup
                    controlId='newPoll'
                >
                    <ControlLabel>{this.props.topTitle}</ControlLabel>
                    <div>Title</div>
                    <FormControl
                        type='text'
                        value={this.props.title}
                        onChange={this.props.handleTitleChange}
                    />
                    Options
                    <div>
                        {this.props.answerOptions.map((option, idx) => {
                            return (
                                <div style={{...alignHorizontally, ...optionStyle}} key={idx}>
                                    <FormControl
                                        type='text'
                                        value={this.props.answerOptions[idx]}
                                        onChange={this.props.handleOptionChange(idx)}
                                        onClick={this.props.handleOptionClick(idx)}
                                    />
                                    {this.props.answerOptions.length > 1
                                    ? (<Button style={subbuton} onClick={this.props.handleDeleteOption(idx)}>X</Button>)
                                    : null}
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
    handleDeleteOption: PropTypes.func,
    handleOptionClick: PropTypes.func,
    topTitle: PropTypes.string
};
