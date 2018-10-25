import { combineReducers } from 'redux';
import polls from './pollsReducer';
import isAuthenticated from './authReducer';
import pollCreationStatus from './createPollReducer';
import userId from './userReducer';

export default combineReducers({
    polls,
    isAuthenticated,
    pollCreationStatus,
    userId
});