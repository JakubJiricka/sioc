import {call, put} from 'redux-saga/effects';
import {
    receiveDwellings,
    receiveFavoriteDwellings,
    notifyDwellingSavedSuccessfully,
    receiveOneDwelling,
    receiveFindedDwellings,
    receiveLoadMoreDwellings,
    receiveLoadFavouritesSuccess

} from '../actions';
import DwellingService from '../services/dwelling';
import UserService from '../services/user';

export function* saveDwelling({dwelling}) {
    yield call(DwellingService.save, dwelling);
    yield put(notifyDwellingSavedSuccessfully());
}

export function* fetchDwellings() {
    const dwellings = yield call(DwellingService.fetch);
    yield put(receiveDwellings(dwellings));
}

export function* fetchFavoriteDwellings() {
    const userProfile = yield call(UserService.getProfile);
    const dwellings = yield call(DwellingService.fetchFavorite, userProfile._id);
    yield put(receiveFavoriteDwellings(dwellings));
    // yield put(receiveDwellings(dwellings));
}

export function* findDwelling({id}) {
    const {dwelling} = yield call(DwellingService.find, id);
    yield put(receiveOneDwelling(dwelling));
}

export function* searchDwellings({searchParams}) {
    const {dwellings} = yield call(DwellingService.findSearch, searchParams);
    yield put(receiveFindedDwellings(dwellings));
}

export function* fetchLoadMoreDwellings({searchParams}) {
    const dwellings = yield call(DwellingService.fetchLoadMore, searchParams);
    yield put(receiveLoadMoreDwellings(dwellings));
}

export function* requestFavoriteDwellingsMore({searchParams}){
    dwellings_favourite = [];
    try{
        if(searchParams)
        {
            var dwellings_favourite = yield call(DwellingService.fetchFavoriteMore, searchParams);    
        }
        yield put(receiveLoadFavouritesSuccess(dwellings_favourite));
    }
    catch(error)
    {
        yield put({type:'Fetch Failed',error});
    }
    
}