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

    let result;
    if (req.headers.type === 'user') {
        result = jwt.verify(req, 'user');
    } else if (req.headers.type === 'admin') {
        result = jwt.verify(req, 'admin');
    } else if(req.headers.type === 'cinema') {
        result = jwt.verify(req, 'cinema');
    }
    if (result) {
        req.token = {};
        if (result.UserId) {
            req.token.UserId = result.UserId;
        } else if (result.AdminId) {
            req.token.AdminId = result.AdminId;
        }else if(result.CinemaId){
            req.token.CinemaId = result.CinemaId;
        }
        next();
    } else {
        res.status(403).send(util.sendMsg(403, "请登录后访问！"));
        return;
    }
}