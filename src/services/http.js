/* global fetch FormData ENDPOINT */
import axios from 'axios';
import StorageService from './storage';

// const apiKey = 651684583823529;
// const uploadPreset = 'gceayald';

const CLOUDINARY_UPLOAD_PRESET = 'gceayald';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sioc/image/upload';
const CLOUDINARY_API_KEY = '651684583823529';

//const ENDPOINT = 'http://localhost:6720/';

const getAuthorizationHeader = () => `Bearer ${StorageService.getAuthToken()}`;

export default class Http {
    static async get(url) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json',
                Authorization: getAuthorizationHeader()
            }
        });
        return response.json();
    }

    static async uploadImg(files) {
        let uploadedFiles = [];
        const uploaders = files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("api_key", CLOUDINARY_API_KEY);
            formData.append("timestamp", (Date.now() / 1000) | 0);
            return axios.post(CLOUDINARY_UPLOAD_URL, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                uploadedFiles.push(response.data);
            })
        });
        const response = await axios.all(uploaders);
        return uploadedFiles;
    }

    static async deleteImg(url, token) {
        const data = new FormData();
        data.append('token', token);
        const response = await fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        return response.json();
    }

    static async post(url, body) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                Authorization: getAuthorizationHeader()
            }
        });
        return response.json();
    }

    static async put(url, body) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'put',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                Authorization: getAuthorizationHeader()
            }
        });
        return response.json();
    }

    static async delete(url, body) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'delete',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                Authorization: getAuthorizationHeader()
            }
        });
        return response.json();
    }

    static async postFile(url, file) {
        const data = new FormData();
        data.append('file', file);

        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'POST',
            credentials: 'same-origin',
            body: data
        });
        return response.json();
    }
}
