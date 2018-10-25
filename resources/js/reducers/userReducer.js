import {LOGOUT} from "../constants/actions_types";

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case LOGOUT:
            return {
                ...state,
                userId: -1
            };
        default:
            return state;
    }
}