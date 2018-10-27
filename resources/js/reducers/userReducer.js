import {
    DELETE_POLL_ERROR,
    EDIT_POLL_ERROR,
    ERROR_CREATING_POLL,
    ERROR_FETCHONG_POLLS,
    LOGOUT
} from "../constants/actions_types";
import {TOKEN_EXPIRED, USER_NOT_FOUND} from "../constants/errors";

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case DELETE_POLL_ERROR:
        case ERROR_CREATING_POLL:
        case EDIT_POLL_ERROR:
        case ERROR_FETCHONG_POLLS:
            if (action.error === USER_NOT_FOUND
                || action.error === TOKEN_EXPIRED) {
                window.localStorage.setItem('jwtToken', '');
                return {
                    id: -1,
                    isAuthenticated: false
                };
            }
            return state;
        case LOGOUT:
            window.localStorage.setItem('jwtToken', '');
            return {
                id: -1,
                isAuthenticated: false
            };
        default:
            return state;
    }
}