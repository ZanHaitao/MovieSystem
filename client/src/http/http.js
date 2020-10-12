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
            return request.method === value.method && (url === value.path || url.slice(0, url.lastIndexOf('/')) === value.path) && url != '/api/cinema/whoami'
        })
        const isCinema = validataCinema.findIndex(value => {
            return request.method === value.method && (url === value.path || url.slice(0, url.lastIndexOf('/')) === value.path)
        })
        const method = request.method
        if (isUser != -1 && userToken && request.headers.type == 'user') {
            if (method === 'post') {
                request.headers.post.authorization = "bearer " + userToken;
            } else if (method === 'put') {
                request.headers.put.authorization = "bearer " + userToken;
            } else if (method === 'delete') {
                request.headers.delete.authorization = "bearer " + userToken;
            }
        }
        if (isAdmin != -1 && adminToken && request.headers.type == 'admin') {
            if (method === 'post') {
                request.headers.post.authorization = "bearer " + adminToken;
            } else if (method === 'put') {
                request.headers.put.authorization = "bearer " + adminToken;
            } else if (method === 'delete') {
                request.headers.delete.authorization = "bearer " + adminToken;
            }
        }
        if (isCinema != -1 && cinemaToken && request.headers.type == 'cinema') {
            if (method === 'post') {
                request.headers.post.authorization = "bearer " + cinemaToken;
            } else if (method === 'put') {
                request.headers.put.authorization = "bearer " + cinemaToken;
            } else if (method === 'delete') {
                request.headers.delete.authorization = "bearer " + cinemaToken;
            }
        }
        return request
    })

    instance.interceptors.response.use((response) => {

        if (response.headers.authorization) {
            if (response.config.url.indexOf('user') != -1) {
                localStorage.setItem('userToken', response.headers.authorization);
            } else if (response.config.url.indexOf('admin') != -1) {
                localStorage.setItem('adminToken', response.headers.authorization);
            } else if (response.config.url.indexOf('cinema') != -1) {
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
            } else if (err.response.config.url === '/api/cinema/whoami') {
                localStorage.removeItem('cinemaToken');
            }
        }
        return Promise.reject(err);
    })

    return instance
}