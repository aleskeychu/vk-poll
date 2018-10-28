import React, {Component} from 'react';
import {Button, Label, Row} from "react-bootstrap";
import {pollType} from '../types';
import PropTypes from 'prop-types';

export default class PollComponent extends Component {


    render() {
        const userHasVoted = this.props.poll.userVotedFor.length !== 0;
        const creatorIsCurrentUser = this.props.userId === this.props.poll.user_id;

        const header = (
            <div><Row>
                {/*<UserComponent user={this.props.user} />*/}
                {creatorIsCurrentUser
                    ? (<div>
                        <Button onClick={this.props.onEdit}>edit</Button>
                        <Button onClick={this.props.onDelete}>delete</Button>
                    </div>)
                    : null
                }
            </Row></div>
        );

        const unvoteButton = (creatorIsCurrentUser && userHasVoted)
            ? (<div>
                <Button onClick={this.props.onUnvote}>Unvote</Button>
            </div>)
            : null;

        const title = (<Row><h3><Label>{this.props.poll.title}</Label></h3></Row>);
        const typeOfPoll = (<Row><h4><Label>{this.props.poll.is_anonymous ? 'Anonymous poll' : 'Public poll'}</Label></h4></Row>);

        let options;
        if (userHasVoted) {
            options = this.props.poll.options.map((elem, idx) => {
                let option = (<Row key={idx}><h4><Label>{elem.text + ' (' + elem.vote_count + ')'} </Label></h4></Row>);
                if (this.props.poll.userVotedFor.find(index => index === elem.index) !== undefined) {
                    option = (<div key={idx}>{option}</div>);
                }
                return option;
            });
        } else {
            options = this.props.poll.options.map((elem, idx) => {
                let option = (<Row key={idx}><h4>
                    <Button
                        onClick={this.props.onVote(this.props.poll.id, elem.index, this.props.userId)}>
                        {elem.text + ' (' + elem.vote_count + ')'}
                    </Button>
                </h4></Row>);
                if (this.props.optionsToVoteFor.find(index => index === elem.index) !== undefined) {

                    option = (<div key={idx} style={{color: 'red'}}>{option}</div>);
                }
                return option;
            });
        }
        const multiSubmitButton = (!this.props.poll.is_multianswer || this.props.optionsToVoteFor.length === 0)
            ? null
            : (<div>
                    <Button onClick={this.props.onMultiSubmit}>Save</Button>
                </div>
            );
        return (
            <div>
                {header}
                {unvoteButton}
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
    onUnvote: PropTypes.func.isRequired
};