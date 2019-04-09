import {
    USER_PROFILE_SUCCEEDED,
    USER_SAVE_REQUESTED,
    USER_ADD_FAVORITE,
    USER_SAVE_SUCCEEDED,
    USER_SAVE_FAILED,
    USER_CLEAR_SAVED,
    USERS_BYROLE_SUCCEEDED,
    USERS_SEARCH_SUCCEEDED,
    CLEAR_USERS,
    USER_FETCH_SUCCEEDED,
    USER_FIND_SUCCEEDED,
    USER_DELETE_REQUESTED,
    USER_DELETE_SUCCEEDED,
    LOAD_MORE_USERS_FETCH_SUCCEEDED
} from '../actions';

export default function user(state = {}, action) {
    switch (action.type) {
        case USER_PROFILE_SUCCEEDED:
            return {...state, userProfile: action.userProfile};
        case USER_SAVE_REQUESTED:
            return {...state, saving: true};
        case USER_ADD_FAVORITE:
            return {...state};
        case USER_SAVE_SUCCEEDED:
            return {...state, saving: false, saved: true, unsaved: false};
        case USER_SAVE_FAILED:
            return {...state, saving: false, saved: false, unsaved: true};
        case USER_CLEAR_SAVED:
            return {...state, saved: false, unsaved: false};
        case USERS_BYROLE_SUCCEEDED:
            return {...state, usersByRole: action.usersByRole};
        case USERS_SEARCH_SUCCEEDED:
            if (action.userType === 'martillero') {
                return {...state, auctioneersUsersOptions: action.usersOptions};
            } else if (action.userType === 'capitan') {
                return {...state, captainUsersOptions: action.usersOptions};
            } else if (action.userType === 'usuario') {
                return {...state, clientUsersOptions: action.usersOptions};
            } else if (action.userType === 'vendedor') {
                return {...state, sellersUsersOptions: action.usersOptions};
            }
            return {...state, usersOptions: action.usersOptions};
        case LOAD_MORE_USERS_FETCH_SUCCEEDED:
            return {...state, users: action.users};
        case CLEAR_USERS:
            return {...state, users: []};
        case USER_FETCH_SUCCEEDED:
            return {...state, users: action.users};
        case USER_FIND_SUCCEEDED:
            return {...state, user: action.user};
        case USER_DELETE_REQUESTED:
            return {...state, deleting: true};
        case USER_DELETE_SUCCEEDED:
            return {...state, deleting: false, users: state.users.filter(user => user._id != action.userId)};
        default:
            return state;
    }
}
