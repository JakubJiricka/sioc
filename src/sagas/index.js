import {takeEvery} from 'redux-saga';
import {
    SIGN_OUT_REQUESTED,
    DWELLING_SAVE_REQUESTED,
    DWELLINGS_FETCH_REQUESTED,
    FAVORITE_DWELLINGS_FETCH_REQUESTED,
    DWELLING_FIND_REQUESTED,
    DWELLINGS_SEARCH_REQUESTED,
    USER_PROFILE_REQUESTED,
    USER_DELETE_REQUESTED,
    USER_SAVE_REQUESTED,
    USER_ADD_FAVORITE,
    USERS_BYROLE_REQUESTED,
    USERS_SEARCH_REQUESTED,
    USER_ROLE_CHANGE_REQUESTED,
    LOAD_MORE_DWELLINGS_FETCH_REQUESTED,
    AGENCY_SAVE_REQUESTED,
    AGENCY_FETCH_REQUESTED,
    AGENCY_DELETE_REQUESTED,
    USER_FETCH_REQUESTED,
    USER_FIND_REQUESTED,
    LOAD_MORE_USERS_FETCH_REQUESTED,
    CLIENT_SAVE_REQUESTED,
    CLIENT_FETCH_REQUESTED,
    CLIENT_DELETE_REQUESTED,
    CLIENT_SEARCH_REQUESTED,
    VISIT_SAVE_REQUESTED,
    VISIT_UPDATE_REQUESTED,
    VISITS_FETCH_REQUESTED,
    MORE_VISITS_FETCH_REQUESTED,
    VISIT_STATUS_CHANGE_REQUESTED,
    REQUEST_FAVOURITE_LOAD_REQUESTED
} from '../actions';
import {saveDwelling, fetchDwellings, findDwelling, searchDwellings, fetchLoadMoreDwellings, fetchFavoriteDwellings,requestFavoriteDwellingsMore} from './dwelling';
import {signOut} from './session';
import {saveAgency, fetchAgencies, deleteAgency} from './agency';
import {fetchUserProfile, deleteUser, saveUser, addFavorite, fetchUsersByRole, searchUsers, changeUserRole, findUser, fetchUsers, fetchLoadMoreUsers} from './user';
import {saveClient, fetchClients, deleteClient, searchClients} from './client';
import {saveVisits, fetchVisits, fetchMoreVisits, changeVisitStatus,updateVisits} from './visit';

export default function* root() {
    yield [
        takeEvery(SIGN_OUT_REQUESTED, signOut),
        takeEvery(DWELLING_SAVE_REQUESTED, saveDwelling),
        takeEvery(DWELLINGS_FETCH_REQUESTED, fetchDwellings),
        takeEvery(FAVORITE_DWELLINGS_FETCH_REQUESTED, fetchFavoriteDwellings),
        takeEvery(DWELLING_FIND_REQUESTED, findDwelling),
        takeEvery(DWELLINGS_SEARCH_REQUESTED, searchDwellings),
        takeEvery(USER_PROFILE_REQUESTED, fetchUserProfile),
        takeEvery(USER_DELETE_REQUESTED, deleteUser),
        takeEvery(USER_SAVE_REQUESTED, saveUser),
        takeEvery(USER_ADD_FAVORITE, addFavorite),
        takeEvery(USERS_BYROLE_REQUESTED, fetchUsersByRole),
        takeEvery(USERS_SEARCH_REQUESTED, searchUsers),
        takeEvery(USER_ROLE_CHANGE_REQUESTED, changeUserRole),
        takeEvery(LOAD_MORE_USERS_FETCH_REQUESTED, fetchLoadMoreUsers),
        takeEvery(LOAD_MORE_DWELLINGS_FETCH_REQUESTED, fetchLoadMoreDwellings),
        takeEvery(REQUEST_FAVOURITE_LOAD_REQUESTED, requestFavoriteDwellingsMore),
        takeEvery(AGENCY_SAVE_REQUESTED, saveAgency),
        takeEvery(AGENCY_FETCH_REQUESTED, fetchAgencies),
        takeEvery(AGENCY_DELETE_REQUESTED, deleteAgency),
        takeEvery(USER_FETCH_REQUESTED, fetchUsers),
        takeEvery(USER_FIND_REQUESTED, findUser),
        takeEvery(CLIENT_SAVE_REQUESTED, saveClient),
        takeEvery(CLIENT_FETCH_REQUESTED, fetchClients),
        takeEvery(CLIENT_DELETE_REQUESTED, deleteClient),
        takeEvery(CLIENT_SEARCH_REQUESTED, searchClients),
        takeEvery(VISIT_SAVE_REQUESTED, saveVisits),
        takeEvery(VISIT_UPDATE_REQUESTED,updateVisits),
        takeEvery(VISITS_FETCH_REQUESTED, fetchVisits),
        takeEvery(MORE_VISITS_FETCH_REQUESTED, fetchMoreVisits),
        takeEvery(VISIT_STATUS_CHANGE_REQUESTED, changeVisitStatus),
        
    ];
}
