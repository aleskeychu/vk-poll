import { LOGOUT } from '../constants/actions_types';

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: ''
            };
        default:
            return state;
    }
}