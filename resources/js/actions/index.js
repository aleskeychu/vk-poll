import * as type from '../constants/actions_types';
import {FETCH_POLLS_URL, POLL_URL, VOTE_URL} from '../constants/api_urls';

const axios = require('axios');

const authHeaderHelper = () => {
    return {
        headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('jwtToken')}
    };
};

const fetchPolls = (polls) => {
    return {
        type: type.FETCH_MORE_POLLS,
        polls
    };
};

const errorFetchingPolls = (error) => {
    return {
        type: type.ERROR_FETCHONG_POLLS,
        error: error.response.data.error
    };
};

export const fetchMorePolls = (dispatch) => {
    return (poll_id) => {
        const url = poll_id === null ? FETCH_POLLS_URL : FETCH_POLLS_URL + 'poll_id=' + poll_id;
        return axios.get(url,
            authHeaderHelper())
            .then(response => {
                dispatch(fetchPolls(response.data))
            })
            .catch(error => {
                dispatch(errorFetchingPolls(error));
            });
    };
};

const refreshPollsAction = (polls) => {
    return {
        type: type.REFRESH_POLLS,
        polls
    };
};

export const refreshPolls = (dispatch) => {
    return () => {
        return axios.get(FETCH_POLLS_URL, authHeaderHelper())
            .then(response => {
                dispatch(refreshPollsAction(response.data));
            })
            .catch(error => {
                dispatch(errorFetchingPolls(error));
            })
    };
};


const errorCreatingPoll = (error) => {
    return {
        type: type.ERROR_CREATING_POLL,
        error: error.response.data.error
    };
};

const pollIsBeingCreated = () => {
    return {
        type: type.POLL_BEING_CREATED,
    };
};

const pollSuccessfullyCreated = () => {
    return {
        type: type.POLL_SUCCESSFULLY_CREATED
    };
};

export const createPoll = (dispatch) => {
    return (
        title,
        options,
        isMultianswer,
        isAnonymous
    ) => {
        dispatch(pollIsBeingCreated());
        return axios.post(POLL_URL, {
            title,
            options,
            isMultianswer,
            isAnonymous
        }, authHeaderHelper())
            .then(() => {
                dispatch(pollSuccessfullyCreated());
                refreshPolls(dispatch)(); // refresh
            })
            .catch((error) => {
                dispatch(errorCreatingPoll(error));
            });
    }
};


const editPollStarted = (id) => {
    return {
        type: type.EDIT_POLL_STARTED,
        id
    };
};

const editPollSuccess = (poll) => {
    return {
        type: type.EDIT_POLL_SUCCESS,
        poll
    };
};

const editPollError = (id) => {
    return {
        type: type.EDIT_POLL_ERROR,
        id
    };
};

export const editPoll = (dispatch) => {
    return (
        id,
        title,
        options
    ) => {
        dispatch(editPollStarted());
        axios.post(POLL_URL + '/' + id, {
            title, options
        }, authHeaderHelper())
            .then(response => {
                dispatch(editPollSuccess(response.data));
            })
            .error(error => {
                dispatch(editPollError(id)); // TODO maybe use error var somehow
            });
    }
};

const deletePollStarted = () => {
    return {
        type: type.DELETE_POLL_STARTED
    };
};

const deletePollSuccess = (id) => {
    return {
        type: type.DELETE_POLL_SUCCESS,
        id
    };
};

const deletePollError = () => {
    return {
        type: type.DELETE_POLL_ERROR
    };
};

export const deletePoll = (dispatch) => {
    return (id) => {
        dispatch(deletePollStarted());
        axios.delete(POLL_URL + '/' + id, authHeaderHelper())
            .then(response => {
                dispatch(deletePollSuccess(response.data.poll_id));
            })
            .catch(error => {
                dispatch(deletePollError()); // TODO
            });
    };
};

const voted = (poll_id, option_id, user_id) => {
    return {
        type: type.VOTED,
        poll_id,
        option_id,
        user_id
    };
};

const voted_error = (poll_id, option_id) => {
    return {
        type: type.VOTED_ERROR,
        poll_id,
        option_id
    };
};

export const vote = (dispatch) => {
    return (poll_id, option_id, user_id) => {
        // TODO maybe dispatch started ?
        axios.post(VOTE_URL, {
            poll_id, option_id
        }, authHeaderHelper())
            .then(() => {
                dispatch(voted(poll_id, option_id, user_id))
            })
            .catch(error => {
                // TODO write reducer for it
                // TODO handle case when option has been deleted
                dispatch(voted_error(poll_id, option_id));
            });
    }
};