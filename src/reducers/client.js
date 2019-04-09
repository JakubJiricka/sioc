import {
    CLIENT_SAVE_REQUESTED,
    CLIENT_SAVE_SUCCEEDED,
    CLIENT_SAVE_FAILED,
    CLIENT_CLEAR_SAVED,
    CLIENT_FETCH_SUCCEEDED,
    CLIENT_DELETE_REQUESTED,
    CLIENT_DELETE_SUCCEEDED,
    CLIENT_SEARCH_SUCCEEDED
} from '../actions';

export default function client(state = {}, action) {
    switch (action.type) {
        case CLIENT_SAVE_REQUESTED:
            return {...state, saving: true};
        case CLIENT_SAVE_SUCCEEDED:
            return {...state, saving: false, saved: true, unsaved: false};
        case CLIENT_SAVE_FAILED:
            return {...state, saving: false, saved: false, unsaved: true};
        case CLIENT_CLEAR_SAVED:
            return {...state, saved: false, unsaved: false};
        case CLIENT_FETCH_SUCCEEDED:
            return {...state, clients: action.clients};
        case CLIENT_DELETE_REQUESTED:
            return {...state, deleting: true};
        case CLIENT_DELETE_SUCCEEDED:
            return {...state, deleting: false, clients: state.clients.filter(client => client._id != action.clientId)};
        case CLIENT_SEARCH_SUCCEEDED:
            return {...state, clientsOptions: action.clientsOptions};
        default:
            return state;
    }
}
