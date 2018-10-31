// TODO refactor to fetch url from env
const BASE_URL='http://142.93.238.101:8000/api/';

// GET
export const FETCH_POLLS_URL = BASE_URL + 'polls?';

// POST
export const POLL_URL = BASE_URL + 'poll';
export const VOTE_URL = BASE_URL + 'vote';
