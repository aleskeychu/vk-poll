import { combineReducers } from 'redux';
import polls from './pollsReducer';
import pollCreationStatus from './createPollReducer';
import user from './userReducer';

export default combineReducers({
    polls,
    pollCreationStatus,
    user
});