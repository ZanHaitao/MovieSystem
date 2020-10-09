const util = require('../util/util');
const { pathToRegexp } = require('path-to-regexp');
const jwt = require('../util/jwt');

// 接口验证规则
const validationApi = require('../util/validationApi')

module.exports = (req, res, next) => {
    // 验证接口权限
    const validation = validationApi.filter(api => {
        const reg = pathToRegexp(api.path);
        return api.method == req.method && reg.test(req.path);
    });
    if (validation.length == 0) {
        next();
        return;
    }

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


    const url = req.path;
    let result;
    if (url === '/api/user/whoami' || url.slice(0, url.lastIndexOf('/')) === '/api/session') {
        result = jwt.verify(req, 'user');
    } else if (validataAdmin.indexOf(url.slice(0, url.lastIndexOf('/'))) != -1 || validataAdmin.indexOf(url) != -1) {
        result = jwt.verify(req, 'admin');
    } else {
        result = jwt.verify(req, 'cinema');
    }
    if (result) {
        req.token = {};
        if (result.UserId) {
            req.token.UserId = result.UserId;
        } else if (result.AdminId) {
            req.token.AdminId = result.AdminId;
        }
        next();
    } else {
        res.status(403).send(util.sendMsg(403, "请登录后访问！"));
    }
}