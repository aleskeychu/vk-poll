import {DELETE_POLL, FETCH_MORE_POLLS, REFRESH_POLLS, EDIT_POLL_SUCCESS} from "../constants/actions_types";
import update from 'immutability-helper';

export default function pollsReducer(state = {}, action) {
    switch (action.type) {
        case REFRESH_POLLS:
            return {
                ...state,
                polls: action.polls
            };
        case FETCH_MORE_POLLS:
            // leave only those polls which are not yet in the state
            const newPolls = action.polls.filter(poll => {
                return state.polls.find(other => other.id === poll.id) !== undefined
            });
            return {
                ...state,
                polls: state.polls.concat(newPolls)
            };
        case EDIT_POLL_SUCCESS:
            const idxUpdate = state.polls.findIndex(elem => elem.id === action.poll.id);
            const updatedPolls = update(state.polls, {[idxUpdate]: {$set: action.poll}});
            return {
                ...state,
                polls: updatedPolls
            };
        case DELETE_POLL:
            const idxDelete = state.polls.findIndex(elem => elem.id === action.poll.id);
            const pollsAfterDeletion = update(state.poll, {$unset: [idxDelete]});
            return {
                ...state,
                polls: pollsAfterDeletion
            };
        default:
            return state;
    }
}