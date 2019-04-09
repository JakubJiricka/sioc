import Http from './http';
export default class ImagesService {

    static async upload(files) {
        return Http.uploadImg(files);
    }

    static async delete(token) {
        return Http.deleteImg('https://api.cloudinary.com/v1_1/sioc/delete_by_token', token);
    }

    static async deleteImg(token){

        const imageData = {
            token: token,
            url: 'https://api.cloudinary.com/v1_1/sioc/delete_by_token'
        }
        const response = await Http.post('api/images/delete', {imageData});
        return response;
    }
}
