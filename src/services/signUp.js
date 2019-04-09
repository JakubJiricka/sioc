/* global fetch ENDPOINT */

export default class SignUp {
    static async register(user) {
        const response = await fetch(`${ENDPOINT}auth/signUp`, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({user}),
            headers: {
                'content-type': 'application/json'
            }
        });
        return response.json();
    }
}
