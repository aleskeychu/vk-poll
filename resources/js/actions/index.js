import * as type from '../constants/actions_types';
import {FETCH_POLLS_URL, CREATE_POLL_URL} from '../constants/api_urls';

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
        return axios.post(CREATE_POLL_URL, {
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