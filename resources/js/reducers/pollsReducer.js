import {DELETE_POLL, FETCH_MORE_POLLS, REFRESH_POLLS} from "../constants/actions_types";


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
        default:
            return state;
    }
}