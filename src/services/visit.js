import Http from './http';

export default class VisitService {
    static async save(visit) {
        return Http.post('api/visit', {visit});
    }

    static async fetch(searchParams) {
        const {visits} = await Http.post('api/visit/search', {searchParams});
        return visits;
    }
    static async changeStatus(visit) {
        const {visits} = await Http.put(`api/visit/${visit.id}/status`, {visit});
        return visits;
    }

    static async update(visit){
        return Http.put(`api/visit/${visit._id}`,{visit});
    }
}   
