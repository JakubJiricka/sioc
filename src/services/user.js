import {map} from 'lodash';
import Http from './http';
import {Dwelling} from "../model";


export default class UserService {
    static async getProfile() {
        const {user} = await Http.get('api/users/profile');
        return (user);
    }

    static async save(user) {
        if (user._id) {
            return Http.put(`api/users/${user._id}`, {user});
        }
        const result = await Http.post('api/users', {user});
        return result;
    }
    static async add_favorite(user_with_favorite) {
        const result = await Http.post(`api/users/add_favorite/${user_with_favorite._id}`, {user_with_favorite});
        return result;
    }
    static async fetch() {
        const {users} = await Http.get('api/users/');
        return users;
    }

    static async fetchByRole(role) {
        const {users} = await Http.get(`api/users/byRole?role=${role}`);
        return users;
    }

    static async search(term, userType) {
        const {users} = await Http.get(`api/users/search?q=${term}&userType=${userType}`);
        return map(users, user => ({
            disabled: !!user.agency, value: user._id, label: `${user.name} ${user.surname} - ${user.email}`
        }));
    }

    static async fetchLoadMore(searchParams) {
        const {users} = await Http.post('api/users/loadmore', {searchParams});
        return users;
    }

    static async changeRole(changeParams) {
        const {users} = await Http.put(`api/users/changeRole/${changeParams.id}`, changeParams);
        return users;
    }

    static async find(id) {
        const {user} = await Http.get(`api/users/${id}`);
        return user;
    }

    static async delete(userId) {
        return Http.put(`api/users/delete/${userId}`);
    }
}
