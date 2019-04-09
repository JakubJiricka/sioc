import {call} from 'redux-saga/effects';
import SessionService from '../services/session';

// eslint-disable-next-line import/prefer-default-export
export function* signOut() {
    yield call(SessionService.signOut);
}
