const express = require('express');
const CityService = require('../../service/CityService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有城市
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const key = req.query.key || "";
    return await CityService.getCityFindAll(page, limit, key);
}));

/**
 * 通过ID获取城市
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await CityService.getCityFindById(req.params.id);
}));

/**
 * 添加城市
 */
router.post('/', asyncHandler(async (req, res) => {
    return await CityService.addCity(req.body);
}));

/**
 * 修改城市信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await CityService.updateCity(req.params.id, req.body);
}));

/**
 * 通过ID删除城市
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await CityService.deleteCity(req.params.id);
}));

module.exports = router;