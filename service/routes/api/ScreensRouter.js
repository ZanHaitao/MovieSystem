const express = require('express');
const ScreensService = require('../../service/ScreensService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有影厅
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const name = req.query.name || "";
    const people = req.query.people || "";
    return await ScreensService.getScreensFindAll(page, limit, {
        name,
        people
    });
}));

/**
 * 通过ID获取影厅
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await ScreensService.getScreensFindById(req.params.id);
}));

/**
 * 添加影厅
 */
router.post('/', asyncHandler(async (req, res) => {
    return await ScreensService.addScreens(req.body);
}));

/**
 * 修改影厅信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await ScreensService.updateScreens(req.params.id, req.body);
}));

/**
 * 通过ID删除影厅
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await ScreensService.deleteScreens(req.params.id);
}));

module.exports = router;