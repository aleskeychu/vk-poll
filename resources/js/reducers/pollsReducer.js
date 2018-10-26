import {DELETE_POLL, FETCH_MORE_POLLS, REFRESH_POLLS, EDIT_POLL_SUCCESS} from "../constants/actions_types";
import update from 'immutability-helper';

export default function pollsReducer(state = {}, action) {
    switch (action.type) {
        case REFRESH_POLLS:
            return action.polls;
        case FETCH_MORE_POLLS:
            // leave only those polls which are not yet in the state
            const newPolls = action.polls.filter(poll => {
                return state.find(other => other.id === poll.id) === undefined
            });
            return state.concat(newPolls);
        case EDIT_POLL_SUCCESS:
            const idxUpdate = state.polls.findIndex(elem => elem.id === action.poll.id);
            return update(state.polls, {[idxUpdate]: {$set: action.poll}});
        case DELETE_POLL:
            const idxDelete = state.polls.findIndex(elem => elem.id === action.poll.id);
            return update(state.poll, {$unset: [idxDelete]});
        default:
            return state;
    }
}