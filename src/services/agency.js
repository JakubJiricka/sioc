import Http from './http';

export default class AgencyService {
    static async save(agency) {
        if (agency._id) {
            return Http.put(`api/agency/${agency._id}`, {agency});
        }
        return Http.post('api/agency', {agency});
    }

    static async fetch() {
        const {agencies} = await Http.get('api/agency/');
        return agencies;
    }

    static async delete(agency) {
        return Http.put(`api/agency/delete/${agency._id}`, {agency});
    }
}
