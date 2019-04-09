export default class Agency {
    _id = undefined;
    auctioneers = [];
    captain = {};
    sellers = [];
    address = {};
    name = '';
    email = '';
    whatsapp = '';
    phone = '';
    constructor(obj) {
        Object.assign(this, obj);
    }
}
