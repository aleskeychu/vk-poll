import * as type from '../constants/actions_types';
import FETCH_POLLS_URL from '../constants/api_urls';

export const testAction = () => {
    return {
        type: type.TEST
    }
};

const fetchPolls = (polls) => {
    return {
        type: type.FETCH_MORE_POLLS,
        polls
    };
};

// with thunk
export const fetchMorePolls = () => {
    return (dispatch) => {
        return axios.get(FETCH_POLLS_URL)
            .then(response => {
                dispatch(fetchPolls(response.data))
            })
            .catch(error => {
                // TODO DISPATCH ERROR
            });
    };
};