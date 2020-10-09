import axios from '../http/http'

export default {
    /**
     * 用户登录
     * @param {*} loginId
     * @param {*} loginPwd
     */
    async userLogin(loginId, loginPwd) {
        return await axios().post('/api/user/login', {
            loginId,
            loginPwd
        })
    },
    /**
     * 用户身份获取
     */
    async whoAmI() {
        return await axios().post('/api/user/whoami');
    },
    /**
     * 用户添加
     */
    async addUser(options) {
        return await axios().post('/api/user', options);
    },
    /**
     * 用户信息修改
     * @param {*} id
     * @param {*} options
     */
    async updateUser(id, options) {
        return await axios().put(`/api/user/${id}`, options);
    },
    /**
     * 查询用户列表
     * @param {*} options 
     */
    async getUserList(options) {
        return await axios().get('/api/user', {
            params: {
                ...options
            }
        });
    },
    /**
     * 通过id查找用户
     * @param {*} options 
     */
    async getUserFindById(id) {
        return await axios().get(`/api/user/${id}`);
    },
    /**
     * 删除用户
     * @param {*} id 
     */
    async deleteUser(id) {
        return await axios().delete('/api/user/' + id);
    },
    /**
     * 获取banner广告
     */
    async getBanner() {
        return await axios().get('/api/banner', {
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
        return await axios().get('/api/cinema', {
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
        return await axios().get(`/api/cinema/${id}`)
    },
    /**
     * 修改影院
     * @param {*} id 
     * @param {*} options 
     */
    async updateCinema(id, options) {
        return await axios().put('/api/cinema/' + id, options)
    },
    /**
     * 删除影院
     * @param {*} id 
     */
    async deleteCinema(id) {
        return await axios().delete('/api/cinema/' + id)
    },
    /**
     * 添加影院
     * @param {*} options 
     */
    async addCinema(options) {
        return await axios().post('/api/cinema', options)
    },
    /**
     * 获取城市列表
     * @param {*} options
     */
    async getCityList(options) {
        return await axios().get('/api/city', {
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
        return await axios().get(`/api/city/${id}`)
    },
    /**
     * 获取评论列表
     * @param {*} options
     */
    async getCommentList(options) {
        return await axios().get('/api/comments', {
            params: {
                ...options
            }
        })
    },
    /**
     * 通过id查找评论
     * @param {*} id
     */
    async getCommentFindById(id) {
        return await axios().get(`/api/comments/${id}`)
    },
    /**
     * 发布评论
     * @param {*} options
     */
    async addComment(options) {
        return await axios().post('/api/comments', options);
    },
    /**
     * 获取影院服务
     * @param {*} options
     */
    async getCinemaServiceList(options) {
        return await axios().get('/api/movieserver', {
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
        return await axios().get('/api/movie', {
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
        return await axios().get(`/api/movie/${id}`)
    },
    /**
     * 获取订单列表
     * @param {*} options
     */
    async getOrderList(options) {
        return await axios().get('/api/order', {
            params: {
                ...options
            }
        })
    },
    /**
     * 通过id获取订单
     * @param {*} id
     */
    async getOrderFindById(id) {
        return await axios().get('/api/order/' + id)
    },
    /**
     * 添加订单
     * @param {*} options
     */
    async addOrderList(options) {
        return await axios().post('/api/order', options)
    },
    /**
     * 获取电影影厅列表
     * @param {*} options
     */
    async getScreensList(options) {
        return await axios().get('/api/screens', {
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
        return await axios().get('/api/session', {
            params: {
                ...options
            }
        })
    },
    /**
     * 修改电影场次
     * @param {*} options
     */
    async updateSession(id, options) {
        return await axios().put(`/api/session/${id}`, options);
    },
    /**
     * 获取电影类型
     * @param {*} options
     */
    async getMovieTypeList(options) {
        return await axios().get('/api/movietype', {
            params: {
                ...options
            }
        })
    },
    /**
     * 管理员登录
     * @param {*} loginId 
     * @param {*} loginPwd 
     */
    async adminLogin(loginId, loginPwd) {
        return await axios().post('/api/admin/login', {
            loginId,
            loginPwd
        })
    },
    /**
     * 管理员身份获取
     */
    async adminWhoAmI() {
        return await axios().post('/api/admin/whoami');
    },
    /**
     * 获取管理员列表
     * @param {*} options 
     */
    async getAdminList(options) {
        return await axios().get('/api/admin', {
            params: {
                ...options
            }
        })
    },
    /**
     * 通过id获取管理员
     * @param {*} id 
     */
    async getAdminFindById(id) {
        return await axios().get('/api/admin/' + id);
    },
    /**
     * 修改管理员信息
     * @param {*} id 
     * @param {*} options 
     */
    async updateAdmin(id, options) {
        return await axios().put('/api/admin/' + id, options);
    },
    /**
     * 删除管理员
     * @param {*} id 
     */
    async deleteAdmin(id) {
        return await axios().delete('/api/admin/' + id);
    },
    /**
     * 添加管理员
     * @param {*} id 
     */
    async addAdmin(options) {
        return await axios().post('/api/admin', options);
    },
}