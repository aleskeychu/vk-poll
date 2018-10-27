import React, {Component} from 'react';
import {Button, Label, Row} from "react-bootstrap";
import {pollType} from '../types';
import PropTypes from 'prop-types';

export default class PollComponent extends Component {

    render() {
        const userHasVoted = this.props.poll.userVotedFor !== -1;
        const creatorIsCurrentUser = this.props.userId === this.props.poll.user_id;

        // TODO change edit and delete to dropdown
        return (
            <div><Row>
                {/*<UserComponent user={this.props.user} />*/}
                {creatorIsCurrentUser
                    ? (<div>
                        <Button onClick={this.props.onEdit}>edit</Button>
                        <Button onClick={this.props.onDelete}>delete</Button>
                    </div>)
                    : null
                }
            </Row>

                <Row><h3><Label>{this.props.poll.title}</Label></h3></Row>
                {
                    this.props.poll.options.map((elem, idx) => {
                        let poll = userHasVoted
                            ? (<Row key={idx}><h4><Label>{elem.text + ' (' + elem.vote_count + ')'} </Label></h4></Row>)
                            : (<Row key={idx}><h4>
                                <Button
                                    onClick={this.props.onVote(this.props.poll.id, elem.index, this.props.userId)}>
                                    {elem.text + ' (' + elem.vote_count + ')'}
                                </Button>
                            </h4></Row>);
                        if (userHasVoted && elem.index === this.props.poll.userVotedFor) {
                            poll = (<div key={idx} className='votedByUser'>{poll}</div>);
                        }
                        return poll;
                    })
                }
            </div>
        );
    }
}

PollComponent.propTypes = {
    poll: PropTypes.shape(pollType),
    userId: PropTypes.number,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onVote: PropTypes.func
};