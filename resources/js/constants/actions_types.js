export const TEST = 'TEST';

export const REFRESH_POLLS = 'REFRESH_POLLS';
export const FETCH_MORE_POLLS = 'FETCH_MORE_POLLS';

export const ERROR_FETCHONG_POLLS = 'ERROR_FETCHING_POLLS';

export const LOGOUT = 'LOGOUT';


export const PollCreationStatus = Object.freeze({
    'error': 'error',
    'success': 'success',
    'creating': 'creating',
});

export const POLL_BEING_CREATED = PollCreationStatus.creating;
export const POLL_SUCCESSFULLY_CREATED = PollCreationStatus.success;
export const ERROR_CREATING_POLL = PollCreationStatus.error;

export const EDIT_POLL_STARTED = 'EDIT_POLL_STARTED';
export const EDIT_POLL_SUCCESS = 'EDIT_POLL_SUCCESS';
export const EDIT_POLL_ERROR = 'EDIT_POLL_ERROR';

export const DELETE_POLL_STARTED = 'DELETE_POLL_STARTED';
export const DELETE_POLL_SUCCESS = 'DELETE_POLL_SUCCESS';
export const DELETE_POLL_ERROR = 'DELETE_POLL_ERROR';

export const VOTED = 'VOTED';
export const VOTED_ERROR = 'voted_error';