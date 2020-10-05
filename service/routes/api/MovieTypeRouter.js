const express = require('express');
const MovieTypeService = require('../../service/MovieTypeService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有电影类别
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const typeName = req.query.typename || "";
    const type = req.query.type || "";
    return await MovieTypeService.getMovieTypeFindAll(page, limit, {
        typeName,
        type
    });
}));

/**
 * 通过ID获取电影类别
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await MovieTypeService.getMovieTypeFindById(req.params.id);
}));

/**
 * 添加电影类别
 */
router.post('/', asyncHandler(async (req, res) => {
    return await MovieTypeService.addMovieType(req.body);
}));

/**
 * 修改电影类别信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await MovieTypeService.updateMovieType(req.params.id, req.body);
}));

/**
 * 通过ID删除电影类别
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await MovieTypeService.deleteMovieType(req.params.id);
}));

module.exports = router;