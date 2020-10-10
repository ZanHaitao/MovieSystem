const express = require('express');
const SessionService = require('../../service/SessionService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有场次
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const showDate = req.query.showdate || "";
    const showTime = req.query.showtime || "";
    const language = req.query.language || "";
    const price = req.query.price || "";
    const CinemaId = req.query.cinemaid || "";
    const ScreenId = req.query.screenid || "";
    const MovieId = req.query.movieid || "";
    return await SessionService.getSessionFindAll(page, limit, {
        showDate,
        showTime,
        language,
        price,
        CinemaId,
        ScreenId,
        MovieId
    });
}));

/**
 * 通过ID获取场次
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await SessionService.getSessionFindById(req.params.id);
}));

/**
 * 添加场次
 */
router.post('/', asyncHandler(async (req, res) => {
    return await SessionService.addSession(req.body);
}));

/**
 * 修改场次信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.token.UserId || req.token.AdminId) {
        return await SessionService.updateSession(req.params.id, req.body);
    } else {
        res.status(403).send(sendMsg(403, "没有权限访问该接口！"));
    }
}));

/**
 * 通过ID删除场次
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await SessionService.deleteSession(req.params.id);
}));

module.exports = router;