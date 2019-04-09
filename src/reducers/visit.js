import {VISIT_SAVE_REQUESTED, VISITS_FETCH_SUCCEEDED, MORE_VISITS_FETCH_SUCCEEDED,VISIT_UPDATE_REQUESTED} from '../actions';

export default function visit(state = {}, action) {
    switch (action.type) {
        case VISIT_SAVE_REQUESTED:
            return {...state, visit: action.visit};
        case VISITS_FETCH_SUCCEEDED:
            if (action.status === 'nuevo') {
                return {...state, newVisits: action.visits};
            } else if (action.status === 'confirmado') {
                return {...state, confirmedVisits: action.visits};
            } else if (action.status === 'finalizado') {
                return {...state, finalizedVisits: action.visits};
            }
            else if(action.status == 'friendShare')
            {
                return {...state,friendVisits:action.visits};
            }
            return {...state, cancelledVisits: action.visits};
        case MORE_VISITS_FETCH_SUCCEEDED:
            if (action.status === 'nuevo') {
                return {...state, newVisits: [...state.newVisits, ...action.visits]};
            } else if (action.status === 'confirmado') {
                return {...state, confirmedVisits: [...state.confirmedVisits, ...action.visits]};
            } else if (action.status === 'finalizado') {
                return {...state, finalizedVisits: [...state.finalizedVisits, ...action.visits]};
            }
            return {...state, cancelledVisits: [...state.cancelledVisits, ...action.visits]};
        default:
            return state;
    }
}
