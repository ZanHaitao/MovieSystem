import axios from 'axios'

export default function() {
    const instance = axios.create()

    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    const cinemaToken = localStorage.getItem('cinemaToken');

    instance.interceptors.request.use((request) => {
        if (request.url.indexOf('user') != -1 && userToken) {
            request.headers.post.authorization = "bearer " + userToken;
        } else if (request.url.indexOf('admin') != -1 && adminToken) {
            request.headers.post.authorization = "bearer " + adminToken;
        } else if (request.url.indexOf('cinema') != -1 && cinemaToken) {
            request.headers.post.authorization = "bearer " + cinemaToken;
        }
        return request
    })

    instance.interceptors.response.use((response) => {
        if (response.headers.authorization) {
            if (response.config.url.indexOf('user') != -1) {
                console.log(123);
                localStorage.setItem('userToken', response.headers.authorization);
            } else if (response.config.url.indexOf('admin') != -1) {
                localStorage.setItem('adminToken', response.headers.authorization);
            } else {
                localStorage.setItem('cinemaToken', response.headers.authorization);
            }
        }

        if (response.data.code === 200) {
            return response.data.data
        } else {
            return response.data
        }
    }, (err) => {
        if (err.response.status === 403) {
            if (err.response.config.url.indexOf('user') != -1) {
                localStorage.removeItem('userToken');
            } else if (err.response.config.url.indexOf('admin') != -1) {
                localStorage.removeItem('adminToken');
            } else {
                localStorage.removeItem('cinemaToken');
            }
        }
        return Promise.reject(err);
    })

    return instance
}