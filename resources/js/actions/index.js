import * as type from '../constants/actions_types';
import {FETCH_POLLS_URL, POLL_URL} from '../constants/api_urls';
import {POLL_STARTED} from "../constants/actions_types";

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

export const fetchMorePolls = (dispatch) => {
    return (poll_id) => {
        const url = poll_id === null ? FETCH_POLLS_URL : FETCH_POLLS_URL + 'poll_id=' + poll_id;
        return axios.get(url,
            authHeaderHelper())
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
        return axios.get(FETCH_POLLS_URL, authHeaderHelper())
            .then(response => {
                dispatch(refreshPollsAction(response.data));
            })
            .catch(error => {
                // TODO DISPATCH ERROR
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
        type: DELETE_POLL_STARTED
    };
};

const deletePollSuccess = (id) => {
    return {
        type: DELETE_POLL_SUCCESS,
        id
    };
};

const deletePollError = () => {
    return {
        type: DELETE_POLL_ERROR
    };
};

export const deletePoll = (dispatch) => {
    return (id) => {
        dispatch(deletePollStarted());
        axios.delete(POLL_URL + '/' + id, authHeaderHelper())
            .then(response => {
                dispatch(deletePollSuccess(response.data));
            })
            .error(error => {
                dispatch(deletePollError());
            });
    };
};