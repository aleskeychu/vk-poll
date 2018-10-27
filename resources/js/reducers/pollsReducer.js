import {DELETE_POLL, FETCH_MORE_POLLS, REFRESH_POLLS, EDIT_POLL_SUCCESS, VOTED, DELETE_POLL_SUCCESS} from "../constants/actions_types";
import update from 'immutability-helper';

export default function pollsReducer(state = {}, action) {
    switch (action.type) {
        case VOTED:
            let newState = state;
            const idxAlter = state.findIndex(poll => poll.id === action.poll_id);
            // adding new vote to 'voted' array of the poll
            if (!state[idxAlter].is_anonymous) {
                newState = update(state, {
                    [idxAlter]: {
                        votes:
                            {$push: [{user_id: action.user_id, vote_id: action.option_id}]}
                    }
                });
            }
            // increasing counter of votes for the voted option
            const votedOptionIdx = newState[idxAlter].options.findIndex(option => option.index === action.option_id);
            const newCount = newState[idxAlter].options[votedOptionIdx].vote_count + 1;
            newState = update(newState, {
                [idxAlter]: {
                    options: {
                        [votedOptionIdx]: {
                            vote_count: {
                                $set: newCount
                            }
                        }
                    }
                }
            });
            // updating userVotedFor for the poll
            return update(newState, {
                [idxAlter]: {
                    userVotedFor: {
                        $set: action.option_id
                    }
                }
            });
        case REFRESH_POLLS:
            return action.polls;
        case FETCH_MORE_POLLS:
            const newPolls = action.polls.filter(poll => {
                return state.find(other => other.id === poll.id) === undefined
            });
            return state.concat(newPolls);
        case EDIT_POLL_SUCCESS:
            const idxUpdate = state.findIndex(elem => elem.id === action.poll.id);
            return update(state, {[idxUpdate]: {$set: action.poll}});
        case DELETE_POLL_SUCCESS:
            const idxDelete = state.findIndex(elem => elem.id === action.id);
            return update(state, {$splice: [[idxDelete, 1]]});
        default:
            return state;
    }
}