const express = require('express');
const MovieServerService = require('../../service/MovieServerService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有影院服务
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const name = req.query.name || "";
    const content = req.query.content || "";
    const CinemaId = req.query.cinemaid || "";
    return await MovieServerService.getMovieServiceFindAll(page, limit, {
        name,
        content,
        CinemaId
    });
}));

/**
 * 通过ID获取影院服务
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await MovieServerService.getMovieServiceFindById(req.params.id);
}));

/**
 * 添加影院服务
 */
router.post('/', asyncHandler(async (req, res) => {
    return await MovieServerService.addMovieService(req.body);
}));

/**
 * 修改影院服务信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await MovieServerService.updateMovieService(req.params.id, req.body);
}));

/**
 * 通过ID删除影院服务
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await MovieServerService.deleteMovieService(req.params.id);
}));

module.exports = router;