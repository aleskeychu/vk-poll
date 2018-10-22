import {ADD_POLL, DELETE_POLL, FETCH_MORE_POLLS} from "../constants/actions_types";


export default function pollsReducer(state = {}, action) {
    switch(action.type) {
        case ADD_POLL:
            return state;
        case DELETE_POLL:
            return state;
        case FETCH_MORE_POLLS:
            return {
                ...state,
                polls: state.polls.concat(action.payload)
            };
            // TODO maybe filter for unique by id
    }
}