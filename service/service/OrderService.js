const Order = require('../models/Table/Order');
const User = require('../models/Table/User');
const Cinema = require('../models/Table/Cinema');
const Movie = require('../models/Table/Movie');
const Session = require('../models/Table/Session');
const { pick } = require('../util/propertayHelper');

/**
 * 添加订单
 * @param {*} orderObj 
 */
exports.addOrder = async function(orderObj) {
    orderObj = pick(orderObj, 'number', 'UserId', 'CinemaId', 'SesssionId', 'MovieId');
    const result = await Order.create(orderObj);
    return result.toJSON();
}

/**
 * 修改订单信息
 * @param {*} id 
 * @param {*} orderObj 
 */
exports.updateOrder = async function(id, orderObj) {
    orderObj = pick(orderObj, 'number', 'UserId', 'CinemaId', 'SesssionId', 'MovieId');
    return await Order.update(orderObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除订单信息
 * @param {*} id 
 */
exports.deleteOrder = async function(id) {
    return await Order.destroy({
        where: {
            id,
        }
    })
}


/**
 * 通过ID查找电影
 * @param {*} id 
 */
exports.getOrderFindById = async function(id) {
    const result = await Order.findByPk(id, {
        include: [
            Movie,
            Session,
            Cinema,
            User
        ]
    })
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 按条件查询电影
 * @param {*} page 
 * @param {*} limit 
 * @param {*} options 
 */
exports.getOrderFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'number', 'UserId', 'CinemaId', 'SesssionId', 'MovieId');

    const where = {};
    if ('number' in options) {
        where.number = options.number
    }
    if ('UserId' in options) {
        where.UserId = options.UserId
    }
    if ('CinemaId' in options) {
        where.CinemaId = options.CinemaId
    }
    if ('SesssionId' in options) {
        where.SesssionId = options.SesssionId
    }
    if ('MovieId' in options) {
        where.MovieId = options.MovieId
    }


    const result = await Order.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'number', 'UserId', 'CinemaId', 'SesssionId', 'MovieId'],
        include: [
            Movie,
            Session,
            Cinema,
            User
        ]
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}