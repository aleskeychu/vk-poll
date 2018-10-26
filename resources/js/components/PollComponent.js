import React, {Component} from 'react';
import {Button, Label, Row} from "react-bootstrap";

export default class PollComponent extends Component {

    render() {
        const userHasVoted = this.props.userVotedFor !== -1;
        // TODO change edit and delete to dropdown
        return (
            <div><Row>
                {/*<UserComponent user={this.props.user} />*/}
                {this.props.creatorIsCurrentUser
                    ? (<div>
                        <Button onClick={this.props.onEdit}>edit</Button>
                        <Button onClick={this.props.onDelete}>delete</Button>
                    </div>)
                    : null
                }
                </Row>

                <Row><h3><Label>{this.props.title}</Label></h3></Row>
                {
                    this.props.options.map((elem, idx) => {
                        let poll = userHasVoted
                            ? (<Row key={idx}><h4 ><Label>Label: {elem.text + ' (' + elem.count + ')'} </Label></h4></Row>)
                            : (<Row key={idx}><h4 ><Button>Button: {elem.text + ' (' + elem.count + ')'}</Button></h4></Row>);
                        if (userHasVoted && idx === this.props.userVotedFor) {
                            poll = (<div className='votedByUser'>{poll}</div>);
                        }
                        return poll;
                    })
                }
            </div>
        );
    }
}