export const SIGN_OUT_REQUESTED = 'SIGN_OUT_REQUESTED';

export function requestSignOut() {
    return {type: SIGN_OUT_REQUESTED};
}

export const SAVE_PARTIAL_DWELLING = 'SAVE_PARTIAL_DWELLING';

export function savePartialDwelling(dwelling) {
    return {type: SAVE_PARTIAL_DWELLING, dwelling};
}

export const DWELLING_SAVE_REQUESTED = 'DWELLING_SAVE_REQUESTED ';
export const DWELLING_SAVE_SUCCEEDED = 'DWELLING_SAVE_SUCCEEDED ';

export function requestSaveDwelling(dwelling) {
    return {type: DWELLING_SAVE_REQUESTED, dwelling};
}

export function notifyDwellingSavedSuccessfully() {
    return {type: DWELLING_SAVE_SUCCEEDED};
}


export const DWELLINGS_FETCH_REQUESTED = 'DWELLINGS_FETCH_REQUESTED';
export const DWELLINGS_FETCH_SUCCEEDED = 'DWELLINGS_FETCH_SUCCEEDED';

export function requestDwellings() {
    return {type: DWELLINGS_FETCH_REQUESTED};
}

export function receiveDwellings(dwellings) {
    return {type: DWELLINGS_FETCH_SUCCEEDED, dwellings};
}

export const FAVORITE_DWELLINGS_FETCH_REQUESTED = 'FAVORITE_DWELLINGS_FETCH_REQUESTED';
export const FAVORITE_DWELLINGS_FETCH_SUCCEEDED = 'FAVORITE_DWELLINGS_FETCH_SUCCEEDED';

export function requestFavoriteDwellings() {
    return {type: FAVORITE_DWELLINGS_FETCH_REQUESTED};
}

export function receiveFavoriteDwellings(dwellings) {
    return {type: FAVORITE_DWELLINGS_FETCH_SUCCEEDED, dwellings};
}


export const DWELLING_FIND_REQUESTED = 'DWELLING_FIND_REQUESTED';
export const DWELLING_FIND_SUCCEEDED = 'DWELLING_FIND_SUCCEEDED';

export function requestDwelling(id) {
    return {type: DWELLING_FIND_REQUESTED, id};
}

export function receiveOneDwelling(dwelling) {
    return {type: DWELLING_FIND_SUCCEEDED, dwelling};
}

export const DWELLINGS_SEARCH_REQUESTED = 'DWELLINGS_SEARCH_REQUESTED';
export const DWELLINGS_SEARCH_SUCCEEDED = 'DWELLINGS_SEARCH_SUCCEEDED';

export function requestFindDwellings(searchParams) {
    return {type: DWELLINGS_SEARCH_REQUESTED, searchParams};
}

export function receiveFindedDwellings(dwellings) {
    return {type: DWELLINGS_SEARCH_SUCCEEDED, dwellings};
}

export const USER_PROFILE_REQUESTED = 'USER_PROFILE_REQUESTED';
export const USER_PROFILE_SUCCEEDED = 'USER_PROFILE_SUCCEEDED';

export function requestUserProfile() {
    return {type: USER_PROFILE_REQUESTED};
}

export function receiveUserProfile(userProfile) {
    return {type: USER_PROFILE_SUCCEEDED, userProfile};
}

export const USER_SAVE_REQUESTED = 'USER_SAVE_REQUESTED';
export const USER_SAVE_SUCCEEDED = 'USER_SAVE_SUCCEEDED';
export const USER_SAVE_FAILED = 'USER_SAVE_FAILED';
export const USER_CLEAR_SAVED = 'USER_CLEAR_SAVED';
export const USER_ADD_FAVORITE = 'USER_ADD_FAVORITE';

export function requestSaveUser(user) {
    return {type: USER_SAVE_REQUESTED, user};
}

//
export function requestAddFavorite(data) {
    return {type: USER_ADD_FAVORITE, data};
}

export function notifyUserSavedSuccessfully() {
    return {type: USER_SAVE_SUCCEEDED};
}

export function notifyUserSaveFailed() {
    return {type: USER_SAVE_FAILED};
}

export function clearUserSaved() {
    return {type: USER_CLEAR_SAVED};
}

export const USERS_BYROLE_REQUESTED = 'USERS_BYROLE_REQUESTED';
export const USERS_BYROLE_SUCCEEDED = 'USERS_BYROLE_SUCCEEDED';

export function requestUsersByRole(role) {
    return {type: USERS_BYROLE_REQUESTED, role};
}

export function receiveUsersByRole(usersByRole) {
    return {type: USERS_BYROLE_SUCCEEDED, usersByRole};
}

export const USERS_SEARCH_REQUESTED = 'USERS_SEARCH_REQUESTED';
export const USERS_SEARCH_SUCCEEDED = 'EMPLOYEES_SEARCH_SUCCEEDED';

export function requestSearchUsers(term, userType) {
    return {type: USERS_SEARCH_REQUESTED, term, userType};
}

export function receiveUsersOptions(usersOptions, userType) {
    return {type: USERS_SEARCH_SUCCEEDED, usersOptions, userType};
}

export const USER_ROLE_CHANGE_REQUESTED = 'USER_ROLE_CHANGE_REQUESTED';
export const USER_ROLE_CHANGE_SUCCEEDED = 'USER_ROLE_CHANGE_SUCCEEDED';

export function requestChangeUserRole(changeParams) {
    return {type: USER_ROLE_CHANGE_REQUESTED, changeParams};
}

export function notifyUserRoleChangedSuccessfully(usersOptions) {
    return {type: USER_ROLE_CHANGE_SUCCEEDED, usersOptions};
}

export const CLEAR_USERS = 'CLEAR_USERS';

export function clearUsers() {
    return {type: CLEAR_USERS};
}

export const LOAD_MORE_USERS_FETCH_REQUESTED = 'LOAD_MORE_USERS_FETCH_REQUESTED';
export const LOAD_MORE_USERS_FETCH_SUCCEEDED = 'LOAD_MORE_USERS_FETCH_SUCCEEDED';

export function requestLoadMoreUsers(searchParams) {
    return {type: LOAD_MORE_USERS_FETCH_REQUESTED, searchParams};
}

export function receiveLoadMoreUsers(users) {
    return {type: LOAD_MORE_USERS_FETCH_SUCCEEDED, users};
}

export const LOAD_MORE_DWELLINGS_FETCH_REQUESTED = 'LOAD_MORE_DWELLINGS_FETCH_REQUESTED';
export const LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED = 'LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED';

export function requestLoadMoreDwellings(searchParams) {
    return {type: LOAD_MORE_DWELLINGS_FETCH_REQUESTED, searchParams};
}

export function receiveLoadMoreDwellings(dwellings) {
    return {type: LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED, dwellings};
}

export const SET_MAP_REFS = 'SET_MAP_REFS';

export function setMapRefs(currentPosition) {
    return {type: SET_MAP_REFS, currentPosition};
}

export const AGENCY_FETCH_REQUESTED = 'AGENCY_FETCH_REQUESTED ';
export const AGENCY_FETCH_SUCCEEDED = 'AGENCY_FETCH_SUCCEEDED ';

export function requestAgencies() {
    return {type: AGENCY_FETCH_REQUESTED};
}

export function receiveAgencies(agencies) {
    return {type: AGENCY_FETCH_SUCCEEDED, agencies};
}

export const AGENCY_SAVE_REQUESTED = 'AGENCY_SAVE_REQUESTED ';
export const AGENCY_SAVE_SUCCEEDED = 'AGENCY_SAVE_SUCCEEDED ';
export const AGENCY_SAVE_FAILED = 'AGENCY_SAVE_FAILED';
export const AGENCY_CLEAR_SAVED = 'AGENCY_SAVE_FAILED';

export function requestSaveAgency(agency) {
    return {type: AGENCY_SAVE_REQUESTED, agency};
}

export function notifyAgencySavedSuccessfully() {
    return {type: AGENCY_SAVE_SUCCEEDED};
}

export function notifyAgencySaveFailed() {
    return {type: AGENCY_SAVE_FAILED};
}

export function clearAgencySaved() {
    return {type: AGENCY_CLEAR_SAVED};
}

export const AGENCY_DELETE_REQUESTED = 'AGENCY_DELETE_REQUESTED';
export const AGENCY_DELETE_SUCCEEDED = 'AGENCY_DELETE_SUCCEEDED';

export function requestDeleteAgency(agency) {
    return {type: AGENCY_DELETE_REQUESTED, agency};
}

export function notifyAgencyDeletedSuccessfully(agencyId) {
    return {type: AGENCY_DELETE_SUCCEEDED, agencyId};
}

export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED ';
export const USER_FETCH_SUCCEEDED = 'USER_FETCH_SUCCEEDED ';

export function requestUsers() {
    return {type: USER_FETCH_REQUESTED};
}

export function receiveUsers(users) {
    return {type: USER_FETCH_SUCCEEDED, users};
}

export const USER_FIND_REQUESTED = 'USER_FIND_REQUESTED ';
export const USER_FIND_SUCCEEDED = 'USER_FIND_SUCCEEDED ';

export function requestUser(id) {
    return {type: USER_FIND_REQUESTED, id};
}

export function receiveOneUser(user) {
    return {type: USER_FIND_SUCCEEDED, user};
}

export const USER_DELETE_REQUESTED = 'USER_DELETE_REQUESTED';
export const USER_DELETE_SUCCEEDED = 'USER_DELETE_SUCCEEDED';

export function requestDeleteUser(userId) {
    return {type: USER_DELETE_REQUESTED, userId};
}

export function notifyUserDeletedSuccessfully(userId) {
    return {type: USER_DELETE_SUCCEEDED, userId};
}

export const CLIENT_SAVE_REQUESTED = 'CLIENT_SAVE_REQUESTED';
export const CLIENT_SAVE_SUCCEEDED = 'CLIENT_SAVE_SUCCEEDED';
export const CLIENT_SAVE_FAILED = 'CLIENT_SAVE_FAILED';
export const CLIENT_CLEAR_SAVED = 'CLIENT_CLEAR_SAVED';

export function requestSaveClient(client) {
    return {type: CLIENT_SAVE_REQUESTED, client};
}

export function notifyClientSavedSuccessfully() {
    return {type: CLIENT_SAVE_SUCCEEDED};
}

export function notifyClientSaveFailed() {
    return {type: CLIENT_SAVE_FAILED};
}

export function clearClientSaved() {
    return {type: CLIENT_CLEAR_SAVED};
}

export const CLIENT_FETCH_REQUESTED = 'CLIENT_FETCH_REQUESTED ';
export const CLIENT_FETCH_SUCCEEDED = 'CLIENT_FETCH_SUCCEEDED ';

export function requestClients() {
    return {type: CLIENT_FETCH_REQUESTED};
}

export function receiveClients(clients) {
    return {type: CLIENT_FETCH_SUCCEEDED, clients};
}

export const CLIENT_DELETE_REQUESTED = 'CLIENT_DELETE_REQUESTED ';
export const CLIENT_DELETE_SUCCEEDED = 'CLIENT_DELETE_SUCCEEDED ';

export function requestDeleteClient(clientId) {
    return {type: CLIENT_DELETE_REQUESTED, clientId};
}

export function notifyClientDeletedSuccessfully(clientId) {
    return {type: CLIENT_DELETE_SUCCEEDED, clientId};
}

export const CLIENT_SEARCH_REQUESTED = 'CLIENT_SEARCH_REQUESTED';
export const CLIENT_SEARCH_SUCCEEDED = 'CLIENT_SEARCH_SUCCEEDED';

export function requestSearchClients(term) {
    return {type: CLIENT_SEARCH_REQUESTED, term};
}

export function receiveClientsOptions(clientsOptions) {
    return {type: CLIENT_SEARCH_SUCCEEDED, clientsOptions};
}


export const VISITS_FETCH_REQUESTED = 'VISITS_FETCH_REQUESTED';
export const VISITS_FETCH_SUCCEEDED = 'VISITS_FETCH_SUCCEEDED';

export function requestVisits(searchParams) {
    return {type: VISITS_FETCH_REQUESTED, searchParams};
}

export function receiveVisits(visits, status) {
    return {type: VISITS_FETCH_SUCCEEDED, visits, status};
}

export const MORE_VISITS_FETCH_REQUESTED = 'MORE_VISITS_FETCH_REQUESTED';
export const MORE_VISITS_FETCH_SUCCEEDED = 'MORE_VISITS_FETCH_SUCCEEDED';

export function requestMoreVisits(searchParams) {
    return {type: MORE_VISITS_FETCH_REQUESTED, searchParams};
}

export function receiveMoreVisits(visits, status) {
    return {type: MORE_VISITS_FETCH_SUCCEEDED, visits, status};
}

export const VISIT_STATUS_CHANGE_REQUESTED = 'VISIT_STATUS_CHANGE_REQUESTED';
export const VISIT_STATUS_CHANGE_SUCCEEDED = 'VISIT_STATUS_CHANGE_SUCCEEDED';

export function changeVisitStatus(visit) {
    return {type: VISIT_STATUS_CHANGE_REQUESTED, visit};
}

export function notifyVisitStatusChangedSuccesfully(visits, status) {
    return {type: VISIT_STATUS_CHANGE_SUCCEEDED, visits, status};
}

export const VISIT_SAVE_REQUESTED = 'VISIT_SAVE_REQUESTED';

export function saveVisit(visit) {
    return {type: VISIT_SAVE_REQUESTED, visit};
}

export const VISIT_UPDATE_REQUESTED = 'VISIT_UPDATE_REQUESTED';

export function updateVisit(visit)
{
    return {type: VISIT_UPDATE_REQUESTED,visit};
}

export const REQUEST_FAVOURITE_LOAD_REQUESTED = 'REQUEST_FAVOURITE_LOAD_REQUESTED';
export const RECEIVE_FAVOURITE_LOAD_SUCCESSED = 'RECEIVE_FAVOURITE_LOAD_SUCCESSED';

export function requestLoadFavourites(searchParams) {
    return {type: REQUEST_FAVOURITE_LOAD_REQUESTED, searchParams};
}

export function receiveLoadFavouritesSuccess(dwellings_favourite) {
    return {type: RECEIVE_FAVOURITE_LOAD_SUCCESSED, dwellings_favourite};
}

export const CLEAN_SEARCH_PARAMS = 'CLEAN_SEARCH_PARAMS';

export function cleanSearchParams() {
    return {type: CLEAN_SEARCH_PARAMS};
}
