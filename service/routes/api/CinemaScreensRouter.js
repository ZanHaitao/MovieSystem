const express = require('express');
const CinemaScreensService = require('../../service/CinemaScreensService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有影厅与影院关系
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const ScreenId = req.query.screenid || "";
    const CinemaId = req.query.cinemaid || "";
    return await CinemaScreensService.getCinemaScreensFindAll(page, limit,{
        ScreenId,
        CinemaId
    });
}));

/**
 * 通过ID获取影厅与影院关系
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await CinemaScreensService.getCinemaScreensFindById(req.params.id);
}));

/**
 * 添加影厅与影院关系
 */
router.post('/', asyncHandler(async (req, res) => {
    return await CinemaScreensService.addCinemaScreens(req.body);
}));

/**
 * 修改影厅与影院关系信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await CinemaScreensService.updateCinemaScreens(req.params.id, req.body);
}));

/**
 * 通过ID删除影厅与影院关系
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await CinemaScreensService.deleteCinemaScreens(req.params.id);
}));

module.exports = router;