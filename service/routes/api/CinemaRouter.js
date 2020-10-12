const express = require('express');
const CinemaService = require('../../service/CinemaService');
const { asyncHandler, sendMsg } = require('../util/util');
const jwt = require('../util/jwt');
const router = express.Router();

/**
 * 影院登录
 */
router.post('/login', asyncHandler(async (req, res) => {
    const result = await CinemaService.loginCinema(req.body.loginId, req.body.loginPwd);
    console.log(result);
    if (result) {
        jwt.publish(res, undefined, {
            CinemaId: result.id.toString()
        }, 'cineam')
    }
    return result;
}));

/**
 * 获取影院身份
 */
router.post('/whoami', asyncHandler(async (req, res) => {
    if (req.token.CinemaId) {
        const result = await CinemaService.getCinemaFindById(req.token.CinemaId);
        return result;
    } else {
        res.send(null);
        return ;
    }
}));

/**
 * 获取所有影院
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const name = req.query.name || "";
    const address = req.query.address || "";
    const mobile = req.query.mobile || "";
    const CityId = req.query.cityid || "";
    const loginId = req.query.loginid || "";
    return await CinemaService.getCinemaFindAll(page, limit, {
        name,
        address,
        mobile,
        CityId,
        loginId
    });
}));

/**
 * 通过ID获取影院
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await CinemaService.getCinemaFindById(req.params.id);
}));

/**
 * 添加影院
 */
router.post('/', asyncHandler(async (req, res) => {
    return await CinemaService.addCinema(req.body);
}));

/**
 * 修改影院信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await CinemaService.updateCinema(req.params.id, req.body);
}));

/**
 * 通过ID删除影院
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await CinemaService.deleteCinema(req.params.id);
}));

module.exports = router;