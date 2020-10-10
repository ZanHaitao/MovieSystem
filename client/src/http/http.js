import axios from 'axios';
import validataUser from './validataUser';
import validataAdmin from './validataAdmin';
import validataCinema from './validataCinema';


export default function() {
    const instance = axios.create()

    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    const cinemaToken = localStorage.getItem('cinemaToken');



    instance.interceptors.request.use((request) => {
        const url = request.url;
        const isUser = validataUser.findIndex(value => {
            return request.method === value.method && (url === value.path || url.slice(0, url.lastIndexOf('/')) === value.path)
        })
        const isAdmin = validataAdmin.findIndex(value => {
            return request.method === value.method && (url === value.path || url.slice(0, url.lastIndexOf('/')) === value.path)
        })

        if (isUser != -1 && userToken) {
            request.headers.post.authorization = "bearer " + userToken;
            request.headers.put.authorization = "bearer " + userToken;
            request.headers.type = 'user';
        }
        if (isAdmin != -1 && adminToken) {
            request.headers.post.authorization = "bearer " + adminToken;
            request.headers.put.authorization = "bearer " + adminToken;
            request.headers.delete.authorization = "bearer " + adminToken;
            request.headers.type = 'admin';
        }
        if (url.indexOf('cinema') != -1 && cinemaToken) {
            request.headers.post.authorization = "bearer " + cinemaToken;
            request.headers.put.authorization = "bearer " + cinemaToken;
            request.headers.delete.authorization = "bearer " + cinemaToken;
        }

        return request
    })

    instance.interceptors.response.use((response) => {
        if (response.headers.authorization) {
            if (response.config.url.indexOf('user') != -1) {
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
            if (err.response.config.url === '/api/user/whoami') {
                localStorage.removeItem('userToken');
            } else if (err.response.config.url === '/api/admin/whoami') {
                localStorage.removeItem('adminToken');
            } else {
                localStorage.removeItem('cinemaToken');
            }
        }
        return Promise.reject(err);
    })

    return instance
}