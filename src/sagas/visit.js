import {call, put} from 'redux-saga/effects';
import VisitService from '../services/visit';
import {receiveVisits, receiveMoreVisits} from '../actions';


export function* saveVisits({visit}) {
    yield call(VisitService.save, visit);
}

export function* updateVisits({visit})
{
	yield call(VisitService.update,visit);
}

export function* fetchVisits({searchParams}) {
    const visits = yield call(VisitService.fetch, searchParams);
    yield put(receiveVisits(visits, searchParams.status));
}
export function* fetchMoreVisits({searchParams}) {
    const visits = yield call(VisitService.fetch, searchParams);
    yield put(receiveMoreVisits(visits, searchParams.status));
}

export function* changeVisitStatus({visit}) {
    yield call(VisitService.changeStatus, visit);
    //yield put(receiveMoreVisits(visits, visit.status));
}
