import {createStore, applyMiddleware} from 'redux';
import saga from 'redux-saga';

import reducers from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = saga();

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(sagas);

    return store;
}
