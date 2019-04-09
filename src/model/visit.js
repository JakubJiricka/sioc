export default class Visit {
    _id = undefined;
    client = {};
    dwelling = {};
    status = {};
    createdBy = {};
    dateVisit = '';
    timeVisit = '';
    comment = '';
    agency = {
        requested: undefined,
        received: undefined
    }

    constructor(obj) {
        Object.assign(this, obj);
    }
}
