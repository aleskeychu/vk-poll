import {DELETE_POLL_ERROR, ERROR_CREATING_POLL, LOGOUT} from '../constants/actions_types';

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case DELETE_POLL_ERROR:
        case ERROR_CREATING_POLL:
        case EDIT_POLL_ERROR:
            if (action.error === USER_NOT_FOUND) {
                return '';
            }
            return state;
        case LOGOUT:
            return '';
        default:
            return state;
    }
}