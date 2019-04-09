import {FAVORITE_DWELLINGS_FETCH_SUCCEEDED} from '../actions';

export default function dwelling(state = {}, action) {
    switch (action.type) {
        case FAVORITE_DWELLINGS_FETCH_SUCCEEDED:
            return {...state, dwellings: action.dwellings, loading: false};
        default:
            return state;
    }
}
