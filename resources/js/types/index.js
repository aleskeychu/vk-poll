import {shape, number, string, arrayOf, bool} from 'prop-types';

export const userType = {
    id: number,
    first_name: string,
    second_name: string,
    domain: string,
    image_50: string,
};

export const optionType = {
    index: number,
    text: string,
    vote_count: number
};

export const voteType = {
    user_id: number,
    vote_id: number
};

export const pollType = {
    id: number,
    title: string,
    options: arrayOf(shape(optionType)),
    is_anonymous: number,
    is_multianswer: number,
    userVotedFor: number,
    user_id: number,
    created_at: string,
    user: shape(userType),
    votes: arrayOf(shape(voteType)),
};