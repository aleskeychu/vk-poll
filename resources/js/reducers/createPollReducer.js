import {
    POLL_BEING_CREATED,
    POLL_SUCCESSFULLY_CREATED,
    ERROR_CREATING_POLL,
    PollCreationStatus
} from "../constants/actions_types";

export default function createPollReducer(state = {}, action) {
    switch (action.type) {
        case POLL_BEING_CREATED:
            return PollCreationStatus.creating;
        case POLL_SUCCESSFULLY_CREATED:
            return PollCreationStatus.success;
        case ERROR_CREATING_POLL:
            return PollCreationStatus.error;
        default:
            return state;
    }
}