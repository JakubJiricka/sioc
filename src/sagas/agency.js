import {call, put} from 'redux-saga/effects';
import {notifyAgencySavedSuccessfully, receiveAgencies, notifyAgencyDeletedSuccessfully} from '../actions';
import AgencyService from '../services/agency';

export function* saveAgency({agency}) {
    yield call(AgencyService.save, agency);
    yield put(notifyAgencySavedSuccessfully());
}

export function* fetchAgencies() {
    const agencies = yield call(AgencyService.fetch);
    yield put(receiveAgencies(agencies));
}

export function* deleteAgency({agency}) {
    yield call(AgencyService.delete, agency);
    yield put(notifyAgencyDeletedSuccessfully(agency._id));
}
