import {call, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
    receiveUserProfile,
    notifyUserSavedSuccessfully,
    notifyUserSaveFailed,
    receiveUsersByRole,
    receiveUsersOptions,
    notifyUserRoleChangedSuccessfully,
    receiveOneUser,
    receiveUsers,
    receiveLoadMoreUsers,
    notifyUserDeletedSuccessfully
} from '../actions';
import UserService from '../services/user';

export function* fetchUserProfile() {
    const userProfile = yield call(UserService.getProfile);
    yield put(receiveUserProfile(userProfile));
}

export function* saveUser({user}) {
    const ret = yield call(UserService.save, user);
    if (ret.success)
        yield put(notifyUserSavedSuccessfully());
    else
        yield put(notifyUserSaveFailed());
}

export function* addFavorite({data}){
    const ret = yield call(UserService.add_favorite,data);

}
export function* fetchUsersByRole({role}) {
    const usersByRole = yield call(UserService.fetchByRole, role);
    yield put(receiveUsersByRole(usersByRole));
}

export function* searchUsers({term, userType}) {
    yield call(delay, 500);
    const users = yield call(UserService.search, term, userType);
    yield put(receiveUsersOptions(users, userType));
}

export function* changeUserRole({changeParams}) {
    const usersByRole = yield call(UserService.changeRole, changeParams);
    yield put(receiveUsersByRole(usersByRole));
    yield put(notifyUserRoleChangedSuccessfully());
}

export function* findUser({id}) {
    const user = yield call(UserService.find, id);
    yield put(receiveOneUser(user));
}

export function* fetchUsers() {
    const users = yield call(UserService.fetch);
    yield put(receiveUsers(users));
}

export function* fetchLoadMoreUsers({searchParams}) {
    const users = yield call(UserService.fetchLoadMore, searchParams);
    yield put(receiveLoadMoreUsers(users));
}

export function* deleteUser({userId}) {
    yield call(UserService.delete, userId);
    yield put(notifyUserDeletedSuccessfully(userId));
}
