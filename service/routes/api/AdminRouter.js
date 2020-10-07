const express = require('express');
const AdminService = require('../../service/AdminService');
const { asyncHandler, sendMsg } = require('../util/util');
const jwt = require('../util/jwt')

const router = express.Router();

/**
 * 管理员登录
 */
router.post('/login', asyncHandler(async (req, res) => {
    const result = await AdminService.loginAdmin(req.body.loginId, req.body.loginPwd);
    if (result) {
        jwt.publish(res, undefined, {
            AdminId: result.id.toString()
        })
    }
    return result;
}));

/**
 * 获取所有管理员
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const name = req.query.name || "";
    const loginId = req.query.loginid || "";
    return await AdminService.getAdminFindAll(page, limit, name, loginId);
}));

/**
 * 通过ID获取管理员
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await AdminService.getAdminFindById(req.params.id);
}));

/**
 * 添加管理员
 */
router.post('/', asyncHandler(async (req, res) => {
    return await AdminService.addAdmin(req.body);
}));

/**
 * 修改管理员信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await AdminService.updateAdmin(req.params.id, req.body);
}));

/**
 * 通过ID删除管理员
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await AdminService.deleteAdmin(req.params.id);
}));

module.exports = router;