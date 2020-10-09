const express = require('express');
const CinemaService = require('../../service/CinemaService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

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