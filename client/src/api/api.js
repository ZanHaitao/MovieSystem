import axios from '../http/http'

export default {
    /**
     * 用户登录
     * @param {*} loginId
     * @param {*} loginPwd
     */
    async userLogin(loginId, loginPwd) {
        return await axios.post('/api/user/login', {
            data: {
                loginId,
                loginPwd
            }
        })
    },
    /**
     * 用户信息修改
     * @param {*} id
     * @param {*} options
     */
    async updateUser(id, options) {
        return await axios.put(`/api/user/${id}`, {
            data: {
                ...options
            }
        })
    },
    /**
     * 获取banner广告
     */
    async getBanner() {
        return await axios.get('/api/banner', {
            params: {
                limit: 1
            }
        })
    },
    /**
     * 获取影院列表
     * @param {*} options
     */
    async getCinemaList(options) {
        return await axios.get('/api/cinema', {
            params: {
                ...options
            }
        })
    },
    /**
     * 通过id获取影院
     * @param {*} id
     */
    async getCinemaFindById(id) {
        return await axios.get(`/api/cinema/${id}`)
    },
    /**
     * 获取城市列表
     * @param {*} options
     */
    async getCityList(options) {
        return await axios.get('/api/city', {
            params: {
                ...options
            }
        })
    },
    /**
     * 通过id获取城市
     * @param {*} options
     */
    async getCityFindById(id) {
        return await axios.get(`/api/city/${id}`)
    },
    /**
     * 获取评论列表
     * @param {*} options
     */
    async getCommentList(options) {
        return await axios.get('/api/comments', {
            params: {
                ...options
            }
        })
    },
    /**
     * 获取影院服务
     * @param {*} options
     */
    async getCinemaServiceList(options) {
        return await axios.get('/api/movieserver', {
            params: {
                ...options
            }
        })
    },
    /**
     * 获取电影列表
     * @param {*} options
     */
    async getMovieList(options) {
        return await axios.get('/api/movie', {
            params: {
                ...options
            }
        })
    },
    /**
     * 通过id获取电影信息
     * @param {*} id
     */
    async getMovieFindById(id) {
        return await axios.get(`/api/movie/${id}`)
    },
    /**
     * 获取订单列表
     * @param {*} options
     */
    async getOrderList(options) {
        return await axios.get('/api/order', {
            params: {
                ...options
            }
        })
    },
    /**
     * 获取电影影厅列表
     * @param {*} options
     */
    async getScreensList(options) {
        return await axios.get('/api/screens', {
            params: {
                ...options
            }
        })
    },
    /**
     * 获取电影场次
     * @param {*} options
     */
    async getSessionList(options) {
        return await axios.get('/api/session', {
            params: {
                ...options
            }
        })
    },
    /**
     * 获取电影类型
     * @param {*} options
     */
    async getMovieTypeList(options) {
        return await axios.get('/api/movietype', {
            params: {
                ...options
            }
        })
    }
}