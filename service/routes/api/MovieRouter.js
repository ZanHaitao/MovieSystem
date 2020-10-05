const express = require('express');
const MovieService = require('../../service/MovieService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有电影
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const name = req.query.name || "";
    const region = req.query.region || "";
    const type = req.query.type || "";
    const duration = req.query.duration || "";
    const publishDate = req.query.publishdate || "";
    const score = req.query.score || "";
    const income = req.query.income || "";
    const introduce = req.query.introduce || "";
    return await MovieService.getMovieFindAll(page, limit, {
        name,
        region,
        type,
        duration,
        publishDate,
        score,
        income,
        introduce
    });
}));

/**
 * 通过ID获取电影
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await MovieService.getMovieFindById(req.params.id);
}));

/**
 * 添加电影
 */
router.post('/', asyncHandler(async (req, res) => {
    return await MovieService.addMovie(req.body);
}));

/**
 * 修改电影信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await MovieService.updateMovie(req.params.id, req.body);
}));

/**
 * 通过ID删除电影
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await MovieService.deleteMovie(req.params.id);
}));

module.exports = router;