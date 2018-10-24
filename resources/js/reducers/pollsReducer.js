import {DELETE_POLL, FETCH_MORE_POLLS, REFRESH_POLLS, EDIT_POLL_SUCCESS} from "../constants/actions_types";
import update from 'immutability-helper';

export default function pollsReducer(state = {}, action) {
    switch (action.type) {
        case DELETE_POLL:
            return state; // TODO
        case REFRESH_POLLS:
            return {
                ...state,
                polls: action.polls
            };
        case FETCH_MORE_POLLS:
            const newPolls = action.polls.filter(poll => {
                return state.polls.find(other => other.id === poll.id) !== undefined
            });
            return {
                ...state,
                polls: state.polls.concat(newPolls)
            };
        // TODO maybe filter for unique by id
        case EDIT_POLL_SUCCESS:
            const idx = state.polls.findIndex(elem => elem.id === action.id);
            const updatedPolls = update(state.polls, {[idx]: {$set: action.poll}});
            return {
                ...state,
                polls: updatedPolls
            };
        default:
            return state;
    }
}