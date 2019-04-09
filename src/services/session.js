/* global window */
export default class SessionService {
    static signOut() {
        window.localStorage.removeItem('authToken');
        window.location = '/';
    }
}
