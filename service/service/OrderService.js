const Order = require('../models/Table/Order');
const User = require('../models/Table/User');
const Cinema = require('../models/Table/Cinema');
const Movie = require('../models/Table/Movie');
const Session = require('../models/Table/Session');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");
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
        attributes: ['id', 'number', 'UserId', 'CinemaId', 'SessionId', 'MovieId'],
        include: [
            {
                model:Movie,
                attributes:['id', 'name', 'region', 'type', 'duration', 'publishDate', 'score', 'income', 'introduce', 'imgUrl']
            },
            {
                model:Session,
                attributes:['id', 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId']
            },
            {
                model:User,
                attributes:['id', 'name', 'loginId', 'sex', 'birthday', 'mobile']
            },
            {
                model:Cinema,
                attributes:['id', 'name', 'address', 'mobile', 'imgUrl', 'CityId']
            }
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

    options = pick(options, 'number', 'UserId', 'CinemaId', 'SessionId', 'MovieId');

    const where = {};
    if ('number' in options && options.number) {
        where.number = options.number
    }
    if ('UserId' in options && options.UserId) {
        where.UserId = options.UserId
    }
    if ('CinemaId' in options && options.CinemaId) {
        where.CinemaId = options.CinemaId
    }
    if ('SesssionId' in options && options.SessionId) {
        where.SesssionId = options.SessionId
    }
    if ('MovieId' in options && options.MovieId) {
        where.MovieId = options.MovieId
    }


    const result = await Order.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'number', 'UserId', 'CinemaId', 'SessionId', 'MovieId'],
        include: [
            {
                model:Movie,
                attributes:['id', 'name', 'region', 'type', 'duration', 'publishDate', 'score', 'income', 'introduce', 'imgUrl']
            },
            {
                model:Session,
                attributes:['id', 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId']
            },
            {
                model:User,
                attributes:['id', 'name', 'loginId', 'sex', 'birthday', 'mobile']
            },
            {
                model:Cinema,
                attributes:['id', 'name', 'address', 'mobile', 'imgUrl', 'CityId']
            }
        ]
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}