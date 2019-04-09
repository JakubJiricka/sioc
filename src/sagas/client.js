import {call, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
    notifyClientSavedSuccessfully,
    notifyClientSaveFailed,
    receiveClients,
    notifyClientDeletedSuccessfully,
    receiveClientsOptions
} from '../actions';
import ClientService from '../services/client';

export function* saveClient({client}) {
    const ret = yield call(ClientService.save, client);
    if (ret.success) {
        yield put(notifyClientSavedSuccessfully());
    } else {
        yield put(notifyClientSaveFailed());
    }
}

export function* fetchClients() {
    const clients = yield call(ClientService.fetch);
    yield put(receiveClients(clients));
}

export function* deleteClient({clientId}) {
    yield call(ClientService.delete, clientId);
    yield put(notifyClientDeletedSuccessfully(clientId));
}

export function* searchClients({term}) {
    yield call(delay, 500);
    const clients = yield call(ClientService.search, term);
    yield put(receiveClientsOptions(clients));
}
