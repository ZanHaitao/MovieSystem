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
        }, {
            headers: {
                type: 'user'
            }
        })
    },
    /**
     * 用户身份获取
     */
    async whoAmI() {
        return await axios().post('/api/user/whoami', undefined, {
            headers: {
                type: 'user'
            }
        });
    },
    /**
     * 用户添加
     */
    async addUser(options, type) {
        return await axios().post('/api/user', options, {
            headers: {
                type,
            }
        });
    },
    /**
     * 用户信息修改
     * @param {*} id
     * @param {*} options
     */
    async updateUser(id, options, type) {
        return await axios().put(`/api/user/${id}`, options, {
            headers: {
                type,
            }
        });
    },
    /**
     * 查询用户列表
     * @param {*} options 
     */
    async getUserList(options, type) {
        return await axios().get('/api/user', {
            params: {
                ...options
            },
            headers: {
                type,
            }
        });
    },
    /**
     * 通过id查找用户
     * @param {*} options 
     */
    async getUserFindById(id, type) {
        return await axios().get(`/api/user/${id}`, {
            headers: {
                type,
            }
        });
    },
    /**
     * 删除用户
     * @param {*} id 
     */
    async deleteUser(id, type) {
        return await axios().delete('/api/user/' + id, {
            headers: {
                type,
            }
        });
    },
    /**
     * 获取banner广告
     */
    async getBanner(type) {
        return await axios().get('/api/banner', {
            params: {
                limit: 1
            },
            headers: {
                type,
            }
        })
    },
    /**
     * 获取banner广告
     */
    async getBanner(type) {
        return await axios().get('/api/banner', {
            params: {
                limit: 1
            },
            headers: {
                type,
            }
        })
    },
    /**
     * 获取banner广告列表
     */
    async getBannerList(options, type) {
        return await axios().get('/api/banner', {
            params: {
                ...options
            },
            headers: {
                type,
            }
        })
    },
    /**
     * 通过ID查询banner广告
     */
    async getBannerFindById(id, type) {
        return await axios().get('/api/banner/' + id, {
            headers: {
                type,
            }
        });
    },
    /**
     * 添加banner广告
     */
    async addBanner(options, type) {
        return await axios().post('/api/banner', options, {
            headers: {
                type,
            }
        });
    },
    /**
     * 修改banner广告
     */
    async updateBanner(id, options, type) {
        return await axios().put('/api/banner/' + id, options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 删除banner广告
     */
    async deleteBanner(id, type) {
        return await axios().delete('/api/banner/' + id, {
            headers: {
                type,
            }
        })
    },
    /**
     * 影院登录
     * @param {*} loginId 
     * @param {*} loginPwd 
     */
    async cinemaLogin(loginId, loginPwd) {
        return await axios().post('/api/cinema/login', {
            loginId,
            loginPwd
        }, {
            headers: {
                type: 'cinema'
            }
        })
    },
    /**
     * 影院身份获取
     */
    async cinemaWhoAmI() {
        return await axios().post('/api/cinema/whoami', undefined, {
            headers: {
                type: 'cinema'
            }
        });
    },
    /**
     * 获取影院列表
     * @param {*} options
     */
    async getCinemaList(options, type) {
        return await axios().get('/api/cinema', {
            params: {
                ...options
            },
            headers: {
                type,
            }
        })
    },
    /**
     * 通过id获取影院
     * @param {*} id
     */
    async getCinemaFindById(id, type) {
        return await axios().get(`/api/cinema/${id}`, {
            headers: {
                type,
            }
        })
    },
    /**
     * 修改影院
     * @param {*} id 
     * @param {*} options 
     */
    async updateCinema(id, options, type) {
        return await axios().put('/api/cinema/' + id, options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 删除影院
     * @param {*} id 
     */
    async deleteCinema(id, type) {
        return await axios().delete('/api/cinema/' + id, {
            headers: {
                type,
            }
        })
    },
    /**
     * 添加影院
     * @param {*} options 
     */
    async addCinema(options, type) {
        return await axios().post('/api/cinema', options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 获取城市列表
     * @param {*} options
     */
    async getCityList(options, type) {
        return await axios().get('/api/city', {
            params: {
                ...options
            },
            headers: {
                type,
            }
        })
    },
    /**
     * 通过id获取城市
     * @param {*} options
     */
    async getCityFindById(id, type) {
        return await axios().get(`/api/city/${id}`, {
            headers: {
                type,
            }
        })
    },
    /**
     * 获取评论列表
     * @param {*} options
     */
    async getCommentList(options, type) {
        return await axios().get('/api/comments', {
            params: {
                ...options
            },
            headers: {
                type,
            }
        })
    },
    /**
     * 通过id查找评论
     * @param {*} id
     */
    async getCommentFindById(id, type) {
        return await axios().get(`/api/comments/${id}`, {
            headers: {
                type,
            }
        })
    },
    /**
     * 通过id删除评论
     * @param {*} id
     */
    async deleteComment(id, type) {
        return await axios().delete(`/api/comments/${id}`, {
            headers: {
                type,
            }
        })
    },
    /**
     * 发布评论
     * @param {*} options
     */
    async addComment(options, type) {
        return await axios().post('/api/comments', options, {
            headers: {
                type,
            }
        });
    },
    /**
     * 获取影院服务
     * @param {*} options
     */
    async getCinemaServiceList(options, type) {
        return await axios().get('/api/movieserver', {
            params: {
                ...options
            }
        }, {
            headers: {
                type,
            }
        })
    },
    /**
     * 添加影院服务
     * @param {*} options
     */
    async addCinemaService(options, type) {
        return await axios().post('/api/movieserver', options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 删除影院服务
     * @param {*} options
     */
    async deleteCinemaService(id, type) {
        return await axios().delete('/api/movieserver/' + id, {
            headers: {
                type,
            }
        })
    },
    /**
     * 修改影院服务
     * @param {*} options
     */
    async updateCinemaService(id, options, type) {
        return await axios().put('/api/movieserver/' + id, options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 通过id获取影院服务
     * @param {*} options
     */
    async getCinemaServiceFindById(id, type) {
        return await axios().get('/api/movieserver/' + id, {
            headers: {
                type,
            }
        });
    },
    /**
     * 添加影院服务
     * @param {*} options
     */
    async addCinemaService(options, type) {
        return await axios().post('/api/movieserver', options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 修改影院服务
     * @param {*} id
     * @param {*} options
     */
    async updateCinemaService(id, options, type) {
        return await axios().put('/api/movieserver/' + id, options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 删除影院服务
     * @param {*} id
     */
    async deleteCinemaService(id, type) {
        return await axios().delete('/api/movieserver/' + id, {
            headers: {
                type,
            }
        })
    },
    /**
     * 获取电影列表
     * @param {*} options
     */
    async getMovieList(options, type) {
        return await axios().get('/api/movie', {
            params: {
                ...options
            },
            headers: {
                type,
            }
        })
    },
    /**
     * 通过id获取电影信息
     * @param {*} id
     */
    async getMovieFindById(id, type) {
        return await axios().get(`/api/movie/${id}`, {
            headers: {
                type,
            }
        })
    },
    /**
     * 添加电影信息
     * @param {*} options
     */
    async addMovie(options, type) {
        return await axios().post(`/api/movie`, options, {
            headers: {
                type,
            }
        });
    },
    /**
     * 修改电影信息
     * @param {*} options
     * @param {*} id
     */
    async updateMovie(id, options, type) {
        return await axios().put(`/api/movie/` + id, options, {
            headers: {
                type,
            }
        });
    },
    /**
     * 删除电影信息
     * @param {*} id
     */
    async deleteMovie(id, type) {
        return await axios().delete(`/api/movie/` + id, {
            headers: {
                type,
            }
        });
    },
    /**
     * 获取订单列表
     * @param {*} options
     */
    async getOrderList(options, type) {
        return await axios().get('/api/order', {
            params: {
                ...options
            },
            headers: {
                type,
            }
        })
    },
    /**
     * 通过id获取订单
     * @param {*} id
     */
    async getOrderFindById(id, type) {
        return await axios().get('/api/order/' + id, {
            headers: {
                type,
            }
        })
    },
    /**
     * 添加订单
     * @param {*} options
     */
    async addOrderList(options, type) {
        return await axios().post('/api/order', options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 获取电影影厅列表
     * @param {*} options
     */
    async getScreensList(options, type) {
        return await axios().get('/api/screens', {
            params: {
                ...options
            },
            headers: {
                type,
            }
        })
    },
    /**
     * 通过id获取电影影厅
     * @param {*} id
     */
    async getScreensFindById(id, type) {
        return await axios().get('/api/screens/' + id, {
            headers: {
                type,
            }
        })
    },
    /**
     * 添加电影影厅
     * @param {*} options
     */
    async addScreens(options, type) {
        return await axios().post('/api/screens', options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 修改电影影厅
     * @param {*} options
     */
    async updateScreens(id, options, type) {
        return await axios().put('/api/screens/' + id, options, {
            headers: {
                type,
            }
        })
    },
    /**
     * 删除电影影厅
     * @param {*} options
     */
    async deleteScreens(id, type) {
        return await axios().delete('/api/screens/' + id, {
            headers: {
                type,
            }
        });
    },
    /**
     * 查找电影场次
     * @param {*} options
     */
    async getSessionList(options, type) {
        return await axios().get('/api/session', {
            params: {
                ...options
            },
            headers: {
                type,
            }
        });
    },
    /**
     * 修改电影场次
     * @param {*} options
     */
    async updateSession(id, options, type) {
        return await axios().put(`/api/session/${id}`, options, {
            headers: { type: type }
        });
    },
    /**
     * 删除电影场次
     * @param {*} id
     */
    async deleteSession(id, type) {
        return await axios().delete(`/api/session/${id}`, {
            headers: {
                type,
            }
        });
    },
    /**
     * 添加电影场次
     * @param {*} options
     */
    async addSession(options, type) {
        return await axios().post(`/api/session`, options, {
            headers: {
                type,
            }
        });
    },
    /**
     * 获取电影类型
     * @param {*} options
     */
    async getMovieTypeList(options, type) {
        return await axios().get('/api/movietype', {
            params: {
                ...options
            },
            headers: {
                type,
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
        }, {
            headers: {
                type: 'admin'
            }
        })
    },
    /**
     * 管理员身份获取
     */
    async adminWhoAmI() {
        return await axios().post('/api/admin/whoami', undefined, {
            headers: {
                type: 'admin'
            }
        });
    },
    /**
     * 获取管理员列表
     * @param {*} options 
     */
    async getAdminList(options) {
        return await axios().get('/api/admin', {
            params: {
                ...options
            },
            headers: {
                type: 'admin'
            }
        })
    },
    /**
     * 通过id获取管理员
     * @param {*} id 
     */
    async getAdminFindById(id) {
        return await axios().get('/api/admin/' + id, {
            headers: {
                type: 'admin'
            }
        });
    },
    /**
     * 修改管理员信息
     * @param {*} id 
     * @param {*} options 
     */
    async updateAdmin(id, options) {
        return await axios().put('/api/admin/' + id, options, {
            headers: {
                type: 'admin'
            }
        });
    },
    /**
     * 删除管理员
     * @param {*} id 
     */
    async deleteAdmin(id) {
        return await axios().delete('/api/admin/' + id, {
            headers: {
                type: 'admin'
            }
        });
    },
    /**
     * 添加管理员
     * @param {*} id 
     */
    async addAdmin(options) {
        return await axios().post('/api/admin', options, {
            headers: {
                type: 'admin'
            }
        });
    },
}