const Session = require('../models/Table/Session');
const { pick } = require('../util/propertayHelper');
const Cinema = require('../models/Table/Cinema');
const Movie = require('../models/Table/Movie');
const Screens = require('../models/Table/Screens');
const { Op } = require("sequelize");
/**
 * 添加场次
 * @param {*} sessionObj 
 */
exports.addSession = async function(sessionObj) {
    sessionObj = pick(sessionObj, 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId','seat')
    const result = await Session.create(sessionObj);
    return result.toJSON();
}

/**
 * 修改场次信息
 * @param {*} id 
 * @param {*} sessionObj 
 */
exports.updateSession = async function(id, sessionObj) {
    sessionObj = pick(sessionObj, 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId','seat')
    return await Session.update(sessionObj, {
        where: {
            id
        }
    })
}

/**
 * 删除场次
 * @param {*} id 
 */
exports.deleteSession = async function(id) {
    return await Session.destroy({
        where: {
            id,
        }
    })
}


/**
 * 通过ID查找电影
 * @param {*} id 
 */
exports.getSessionFindById = async function(id) {
    const result = await Session.findByPk(id,{
        attributes: ['id', 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId','seat'],
        include:[
            {
                model:Movie,
                attributes:['id', 'name', 'region', 'type', 'duration', 'publishDate', 'score', 'income', 'introduce', 'imgUrl']
            },
            {
                model:Screens,
                attributes:['id', 'name', 'people', 'seat']
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
exports.getSessionFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId');

    const where = {};
    if ('showDate' in options && options.showDate) {
        where.showDate = {
            [Op.like]: `%${options.showDate}%`
        }
    }
    if ('showTime' in options && options.showTime) {
        where.showTime = {
            [Op.like]: `%${options.showTime}%`
        }
    }
    if ('language' in options && options.language) {
        where.language = {
            [Op.like]: `%${options.language}%`
        }
    }
    if ('price' in options && options.price) {
        where.price = {
            [Op.like]: `%${options.price}%`
        }
    }
    if ('CinemaId' in options && options.CinemaId) {
        where.CinemaId = options.CinemaId
    }
    if ('MovieId' in options && options.MovieId) {
        where.MovieId = options.MovieId
    }
    if ('ScreenId' in options && options.ScreenId) {
        where.ScreenId = options.ScreenId
    }

    const result = await Session.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId','seat'],
        include:[
            {
                model:Movie,
                attributes:['id', 'name', 'region', 'type', 'duration', 'publishDate', 'score', 'income', 'introduce', 'imgUrl']
            },
            {
                model:Screens,
                attributes:['id', 'name', 'people', 'seat']
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