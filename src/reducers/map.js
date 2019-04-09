import {SET_MAP_REFS} from '../actions';

export default function user(state = {}, action) {
    switch (action.type) {
        case SET_MAP_REFS:
            return {...state, currentPosition: action.currentPosition};
        default:
            return state;
    }
}
