import { combineReducers } from 'redux';
import polls from './pollsReducer';
import authToken from './authReducer';
import pollCreationStatus from './createPollReducer';

export default combineReducers({
    polls,
    authToken,
    pollCreationStatus
});