import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup, Button} from "react-bootstrap";
import PropTypes from 'prop-types';
import alignHorizontally from '../styles/alignHorizontally.css';
import componentStyle from '../styles/editableTitleAndOptionsComponent.css';
import subbuton from '../styles/subbutton.css';
import optionStyle from '../styles/options.css';


export default class EditableTitleAndOptionsComponent extends Component {


    render() {
        const titleStyle = this.props.emptyTitle ? {borderColor: '#FF4136'} : {borderColor: '#7FDBFF'};
        const optionColorStyle = this.props.emptyOptions ? {borderColor: '#FF4136'} : {borderColor: '#7FDBFF'};

        return (
            <form style={componentStyle}>
                <FormGroup
                    controlId='newPoll'
                    validationState={this.props.validationState}
                >
                    <ControlLabel> {this.props.topTitle}</ControlLabel>
                    <div>Title</div>
                    <FormControl
                        style={titleStyle}
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
                                        style={optionColorStyle}
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
            </form>
        );
    }
}

EditableTitleAndOptionsComponent.propTypes = {
    title: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    answerOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleOptionChange: PropTypes.func.isRequired,
    handleDeleteOption: PropTypes.func.isRequired,
    handleOptionClick: PropTypes.func.isRequired,
    topTitle: PropTypes.string.isRequired,
    emptyTitle: PropTypes.bool.isRequired,
    emptyOptions: PropTypes.bool.isRequired
};
