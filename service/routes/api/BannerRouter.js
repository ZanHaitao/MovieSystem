const express = require('express');
const BannerService = require('../../service/BannerService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有banner广告
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const title = req.query.title || "";
    return await BannerService.getBannerFindAll(page, limit, { title });
}));

/**
 * 通过ID获取banner广告
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await BannerService.getBannerFindById(req.params.id);
}));

/**
 * 添加banner广告
 */
router.post('/', asyncHandler(async (req, res) => {
    return await BannerService.addBanner(req.body);
}));

/**
 * 修改banner广告
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await BannerService.updateBanner(req.params.id, req.body);
}));

/**
 * 通过ID删除banner广告
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await BannerService.deleteBanner(req.params.id);
}));

module.exports = router;