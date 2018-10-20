import * as types from '../constants/actions_types';


const initialState = {
    isAuthenticated: false
};

export default function testReducer(state = initialState, action) {
    switch(action.type) {
        case types.TEST:
            console.log('init test');
            return {...state};
        default:
            console.log('default state');
            return {...state};

    }
}