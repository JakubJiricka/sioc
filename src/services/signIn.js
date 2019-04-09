/* global fetch ENDPOINT */

export default class SignIn {
    static async login(email, password) {
        const response = await fetch(`${ENDPOINT}auth/login`, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({email, password}),
            headers: {
                'content-type': 'application/json'
            }
        });
        return response.json();
    }
}
