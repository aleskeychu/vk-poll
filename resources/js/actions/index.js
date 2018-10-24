import * as type from '../constants/actions_types';
import {FETCH_POLLS_URL, POST_POLL_URL} from '../constants/api_urls';

const axios = require('axios');

const fetchPolls = (polls) => {
    return {
        type: type.FETCH_MORE_POLLS,
        polls
    };
};

export const fetchMorePolls = (dispatch) => {
    return (offset) => {
        return axios.get(FETCH_POLLS_URL + offset)
            .then(response => {
                dispatch(fetchPolls(response.data))
            })
            .catch(error => {
                // TODO DISPATCH ERROR
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
        return axios.get(FETCH_POLLS_URL + 0)
            .then(response => {
                dispatch(refreshPollsAction(response.data));
            })
            .catch(error => {
                // TODO DISPATCH ERROR
            })
    };
};


const errorCreatingPoll = () => {
    return {
        type: type.ERROR_CREATING_POLL,
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
        return axios.post(POST_POLL_URL, {
            title,
            options,
            isMultianswer,
            isAnonymous
        })
            .then(() => {
                dispatch(pollSuccessfullyCreated());
                refreshPolls(dispatch)(); // refresh
            })
            .catch(() => {
                dispatch(errorCreatingPoll());
            });
    }
};


const editPollStarted = (id) => {
    return {
        type: type.EDIT_POLL_STARTED,
        id
    };
};

const editPollSuccess = (id, title, options) => {
    return {
        type: type.EDIT_POLL_SUCCESS,
        id,
        title,
        options
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
        axios.post(POST_POLL_URL, {
            id, title, options
        })
            .then(response => {
                dispatch(editPollSuccess(id, title, options));
            })
            .error(error => {
                dispatch(editPollError(id)); // TODO maybe use error var somehow
            });
    }
};