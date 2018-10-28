import {
    FETCH_MORE_POLLS,
    REFRESH_POLLS,
    EDIT_POLL_SUCCESS,
    VOTED,
    DELETE_POLL_SUCCESS,
    UNVOTED
} from "../constants/actions_types";
import update from 'immutability-helper';

export default function pollsReducer(state = {}, action) {
    switch (action.type) {
        case VOTED: {
            let newState = state;
            const idxAlter = state.findIndex(poll => poll.id === action.poll_id);
            // const votes = action.option_ids.map(function (vote_id) {
            //     return {
            //         user_id: action.user_id,
            //         vote_id
            //     }
            // });
            // // adding new vote to 'voted' array of the poll
            // if (!state[idxAlter].is_anonymous) {
            //     newState = update(state, {
            //         [idxAlter]: {
            //             votes:
            //                 {$push: votes}
            //         }
            //     });
            // }

            // increasing counter of votes for the voted options
            const votedOptionIndices = action.option_ids.map(function (option_id) {
                return newState[idxAlter].options.findIndex(option => option.index === option_id)
            });
            newState = update(newState, {
                [idxAlter]: {
                    options: {
                        $apply: (options) => {
                            return options.map((option, idx) => {
                                if (votedOptionIndices.find(index => index === idx) !== undefined) {
                                    return {
                                        ...option,
                                        vote_count: option.vote_count + 1
                                    };
                                }
                                return option;
                            });
                        }
                    }
                }
            });
            // updating userVotedFor for the poll
            return update(newState, {
                [idxAlter]: {
                    userVotedFor: {
                        $set: action.option_ids
                    }
                }
            });
        }
        case UNVOTED: {
            const idxDelete = state.findIndex(poll => poll.id = action.poll_id);
            const userVotedFor = state[idxDelete].userVotedFor;
            return update(state, {
               [idxDelete]: {
                   userVotedFor: {
                       $set: []
                   },
                   options: {
                       $apply: (options) => {
                           return options.map((option, idx) => {
                               if (userVotedFor.find(index => index === option.index) !== undefined) {
                                   return {
                                       ...option,
                                       vote_count: option.vote_count - 1
                                   }
                               }
                               return option;
                           });
                       }
                   }
               }
            });
        }
        case REFRESH_POLLS: {
            return action.polls;
        }
        case FETCH_MORE_POLLS: {
            const newPolls = action.polls.filter(poll => {
                return state.find(other => other.id === poll.id) === undefined
            });
            return state.concat(newPolls);
        }
        case EDIT_POLL_SUCCESS: {
            const idxUpdate = state.findIndex(elem => elem.id === action.id);
            return update(state,
                {
                    [idxUpdate]:
                        {
                            title: {$set: action.title},
                            options: {$set: action.options}
                        }
                }
            );
        }
        case DELETE_POLL_SUCCESS: {
            const idxDelete = state.findIndex(elem => elem.id === action.id);
            return update(state, {$splice: [[idxDelete, 1]]});
        }
        default:
            return state;
    }
}