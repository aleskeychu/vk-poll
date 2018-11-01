import React, {Component} from 'react';
import {Button, Label, Row, Checkbox} from "react-bootstrap";
import {pollType} from '../types';
import PropTypes from 'prop-types';
import aligner from '../styles/aligner.css';
import cardHeaderStyle from '../styles/cardHeader.css';
import cardEditDelete from '../styles/cardEditDelete.css';
import UserComponent from './UserComponent';
import userHeaderStyle from "../styles/userHeader.css";
import subbuttonStyle from '../styles/subbutton.css';
import titleStyle from '../styles/title.css';
import subtitleStyle from '../styles/subtitle.css';
import rowStyle from '../styles/row.css';
import clickableOptionStyle from '../styles/clickableOption.css';
import optionRowStyle from '../styles/optionRow.css';
import multianswerOptionStyle from '../styles/multianswerOption.css';
import optionCheckboxStyle from '../styles/optionCheckbox.css';
import optionVotedStyle from '../styles/optionVoted.css';
import optionNotVotedStyle from '../styles/optionNotVoted.css';

export default class PollComponent extends Component {

    render() {
        const userHasVoted = this.props.poll.userVotedFor.length !== 0;
        const creatorIsCurrentUser = this.props.userId === this.props.poll.user_id;

        const header = (
            <div style={{width: '100%'}}>
                <Row style={cardHeaderStyle}>
                    <UserComponent
                        user={this.props.poll.user}
                        style={userHeaderStyle}
                        creationTime={this.props.poll.created_at}
                    />
                    <div style={cardEditDelete}>
                        {(userHasVoted
                                ? <Button style={subbuttonStyle} onClick={this.props.onUnvote}>Unvote</Button>
                                : null
                        )}
                        {creatorIsCurrentUser
                            ? (
                                <div>
                                    <Button style={subbuttonStyle} onClick={this.props.onEdit}>edit</Button>
                                    <Button style={subbuttonStyle} onClick={this.props.onDelete}>delete</Button>
                                </div>
                            )
                            : null
                        }
                    </div>
                </Row>
            </div>
        );

        const title = (<Row style={rowStyle}><h3 style={titleStyle}><Label>{this.props.poll.title}</Label></h3></Row>);
        const typeOfPoll = (
            <Row><h4><Label
                style={subtitleStyle}>{this.props.poll.is_anonymous ? 'Anonymous poll' : 'Public poll'}</Label>
            </h4></Row>);

        let options;
        if (userHasVoted) {
            options = this.props.poll.options.map((elem, idx) => {
                let button;
                if (this.props.poll.userVotedFor.find(index => index === elem.index) !== undefined) {
                    button = (
                        <Button
                            style={optionVotedStyle}
                            onClick={this.props.showVotesWindow(elem.index)}>
                            {elem.text + ' (' + elem.vote_count + ')'}
                        </Button>
                    );
                } else {
                    button = (
                        <Button
                            style={optionNotVotedStyle}
                            onClick={this.props.showVotesWindow(elem.index)}>
                            {elem.text + ' (' + elem.vote_count + ')'}
                        </Button>
                    );
                }

                let option = (
                    <h4 style={{margin: '0 auto'}}>
                        {button}
                    </h4>);
                return (<Row key={idx}>{option}</Row>);
            });
        } else {
            options = this.props.poll.options.map((elem, idx) => {
                let option = (
                    <h4 style={{width: '100%',}}>
                        <Button
                            style={clickableOptionStyle}
                            onClick={this.props.onVote(this.props.poll.id, elem.index, this.props.userId)}>
                            {elem.text + ' (' + elem.vote_count + ')'}
                        </Button>
                    </h4>);
                if (this.props.poll.is_multianswer) {
                    const checked = this.props.optionsToVoteFor.find(index => index === elem.index) !== undefined;
                    option = (<div style={multianswerOptionStyle}>{option}<Checkbox style={optionCheckboxStyle}
                                                                                    checked={checked} readOnly/></div>);
                }
                return (<Row style={optionRowStyle} key={idx}>{option}</Row>);
            });
        }

        const multiSubmitButton = (!this.props.poll.is_multianswer || this.props.optionsToVoteFor.length === 0)
            ? null
            : (<div>
                    <Button style={subbuttonStyle} onClick={this.props.onMultiSubmit}>Save</Button>
                </div>
            );
        return (
            <div style={aligner}>
                {header}
                {title}
                {typeOfPoll}
                {options}
                {multiSubmitButton}
            </div>
        );
    }
}

PollComponent.propTypes = {
    poll: PropTypes.shape(pollType).isRequired,
    userId: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onVote: PropTypes.func.isRequired,
    optionsToVoteFor: PropTypes.arrayOf(PropTypes.number).isRequired,
    onMultiSubmit: PropTypes.func.isRequired,
    onUnvote: PropTypes.func.isRequired,
    showVotesWindow: PropTypes.func.isRequired,
};