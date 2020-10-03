const Session = require('../models/Table/Session');
const { pick } = require('../util/propertayHelper');
const Cinema = require('../models/Table/Cinema');
const Movie = require('../models/Table/Movie');
const Screens = require('../models/Table/Screens');

/**
 * 添加场次
 * @param {*} sessionObj 
 */
exports.addSession = async function(sessionObj) {
    sessionObj = pick(sessionObj, 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId')
    const result = await Session.create(sessionObj);
    return result.toJSON();
}

/**
 * 修改场次信息
 * @param {*} id 
 * @param {*} sessionObj 
 */
exports.updateSession = async function(id, sessionObj) {
    sessionObj = pick(sessionObj, 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId')
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
        include:[
            Cinema,
            Movie,
            Screens
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
    if ('showDate' in options) {
        where.showDate = {
            [Op.like]: `%${options.showDate}%`
        }
    }
    if ('showTime' in options) {
        where.showTime = {
            [Op.like]: `%${options.showTime}%`
        }
    }
    if ('language' in options) {
        where.language = {
            [Op.like]: `%${options.language}%`
        }
    }
    if ('price' in options) {
        where.price = {
            [Op.like]: `%${options.price}%`
        }
    }
    if ('CinemaId' in options) {
        where.CinemaId = options.CinemaId
    }
    if ('MovieId' in options) {
        where.MovieId = options.MovieId
    }
    if ('ScreenId' in options) {
        where.ScreenId = options.ScreenId
    }

    const result = await Session.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'showDate', 'showTime', 'language', 'price', 'CinemaId', 'MovieId', 'ScreenId'],
        include:[
            Cinema,
            Movie,
            Screens
        ]
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}