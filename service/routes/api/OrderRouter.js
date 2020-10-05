const express = require('express');
const OrderService = require('../../service/OrderService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有订单
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const number = req.query.number || "";
    const SesssionId = req.query.sesssionid || "";
    const UserId = req.query.userid || "";
    const CinemaId = req.query.cinemaid || "";
    const MovieId = req.query.movieid || "";
    return await OrderService.getOrderFindAll(page, limit, {
        number,
        SesssionId,
        UserId,
        CinemaId,
        MovieId
    });
}));

/**
 * 通过ID获取订单
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await OrderService.getOrderFindById(req.params.id);
}));

/**
 * 添加订单
 */
router.post('/', asyncHandler(async (req, res) => {
    return await OrderService.addOrder(req.body);
}));

/**
 * 修改订单信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await OrderService.updateOrder(req.params.id, req.body);
}));

/**
 * 通过ID删除订单
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await OrderService.deleteOrder(req.params.id);
}));

module.exports = router;