import {combineReducers} from 'redux';
import dwelling from './dwelling';
import user from './user';
import map from './map';
import agency from './agency';
import client from './client';
import visit from './visit';
import favorite from './favoriteDwellings';

export default combineReducers({
    dwelling, user, map, agency, client, visit, favorite
});
