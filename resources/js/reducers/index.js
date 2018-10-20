import * as types from '../constants/types';


const initialState = {};

export default function testReducer(state = initialState, action) {
    switch(action.type) {
        case types.TEST:
            console.log('init test');
            return {};
        default:
            console.log('default state');
            return {};

    }
}