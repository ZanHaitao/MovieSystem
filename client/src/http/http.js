import axios from 'axios'

export default function() {
    const instance = axios.create()

    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    const cinemaToken = localStorage.getItem('cinemaToken');

    const validataUser = [
        '/api/user/whoami',
    ]

    const validataAdmin = [
        '/api/admin/whoami',
        '/api/admin',
        '/api/user',
        '/api/banner',
        '/api/cinema',
        '/api/cinemaserve',
        '/api/movie',
        '/api/movuetype',
    ]

    instance.interceptors.request.use((request) => {
        const url = request.url;
        if (validataUser.indexOf(url) != -1 && userToken) {
            request.headers.post.authorization = "bearer " + userToken;
        } else if ((validataAdmin.indexOf(url.slice(0, url.lastIndexOf('/'))) != -1 || validataAdmin.indexOf(url)) != -1 && adminToken) {
            request.headers.post.authorization = "bearer " + adminToken;
            request.headers.put.authorization = "bearer " + adminToken;
            request.headers.delete.authorization = "bearer " + adminToken;
        } else if (url.indexOf('cinema') != -1 && cinemaToken) {
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