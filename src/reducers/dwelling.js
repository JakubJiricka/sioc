import {
    DWELLING_FIND_SUCCEEDED,
    DWELLING_SAVE_REQUESTED,
    DWELLING_SAVE_SUCCEEDED,
    DWELLINGS_FETCH_SUCCEEDED,
    DWELLINGS_SEARCH_REQUESTED,
    DWELLINGS_SEARCH_SUCCEEDED,
    SAVE_PARTIAL_DWELLING,
    DWELLING_FIND_REQUESTED,
    LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED,
    RECEIVE_FAVOURITE_LOAD_SUCCESSED,
    CLEAN_SEARCH_PARAMS
} from '../actions';

export default function dwelling(state = {}, action) {
    switch (action.type) {
        case DWELLINGS_FETCH_SUCCEEDED:
            return {...state, dwellings: action.dwellings, loading: false};
        case SAVE_PARTIAL_DWELLING:
            return {...state, dwelling: action.dwelling};
        case DWELLING_FIND_REQUESTED:
            return {...state, loading: true};
        case DWELLING_FIND_SUCCEEDED:
            return {...state, loading: false, dwelling: action.dwelling};
        case DWELLING_SAVE_REQUESTED:
            return {...state, saving: true};
        case DWELLING_SAVE_SUCCEEDED:
            return {...state, saving: false};
        case DWELLINGS_SEARCH_REQUESTED:
            return {...state, searchParams: action.searchParams, loading: true};
        case DWELLINGS_SEARCH_SUCCEEDED:
            return {...state, searchedDwellings: action.dwellings, loading: false};
        case LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED:
            return {...state, dwellings: action.dwellings};
        case RECEIVE_FAVOURITE_LOAD_SUCCESSED:
            return {...state, dwellings_favourite: action.dwellings_favourite};
        case CLEAN_SEARCH_PARAMS:
            return {...state, searchParams: null};
        default:
            return state;
    }
}
