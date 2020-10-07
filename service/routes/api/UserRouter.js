const express = require('express');
const UserService = require('../../service/UserService');
const { asyncHandler, sendMsg } = require('../util/util');
const jwt = require('../util/jwt');
const router = express.Router();

/**
 * 用户登录
 */
router.post('/login', asyncHandler(async (req, res) => {
    const result = await UserService.loginUser(req.body.loginId, req.body.loginPwd);
    if (result) {
        jwt.publish(res, undefined, {
            UserId: result.id.toString()
        })
    }
    return result;
}));

/**
 * 获取所有用户
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const name = req.query.name || "";
    const loginId = req.query.loginid || "";
    const sex = req.query.sex || -1;
    const birthday = req.query.birthday || "";
    const mobile = req.query.mobile || "";
    return await UserService.getUserFindAll(page, limit, {
        name,
        loginId,
        sex,
        birthday,
        mobile
    });
}));

/**
 * 通过ID获取用户
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await UserService.getUserFindById(req.params.id);
}));

/**
 * 添加用户
 */
router.post('/', asyncHandler(async (req, res) => {
    return await UserService.addUser(req.body);
}));

/**
 * 修改用户信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.token.UserId || req.token.Admin) {
        return await UserService.updateUser(req.params.id, req.body);
    } else {
        res.status(403).send(sendMsg(403, "没有权限访问该接口！"));
    }
}));

/**
 * 通过ID删除用户
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    if (req.token.UserId || req.token.Admin) {
        return await UserService.deleteUser(req.params.id);
    } else {
        res.status(403).send(sendMsg(403, "没有权限访问该接口！"));
    }
}));

/**
 * 获取用户身份
 */
router.post('/whoami', asyncHandler(async (req, res) => {
    if (req.token.UserId) {
        return await UserService.getUserFindById(req.token.UserId);
    } else {
        res.send(null);
    }
}));

module.exports = router;