const MovieService = require('../models/Table/MovieService');
const Cinema = require('../models/Table/Cinema');
const { pick } = require('../util/propertayHelper');

/**
 * 添加影院服务
 * @param {*} movieServiceObj 
 */
exports.addMovieService = async function(movieServiceObj) {
    movieServiceObj = pick(movieServiceObj, 'name', 'content', 'CinemaId');
    const result = await MovieService.create(movieServiceObj);
    return result.toJSON();
}

/**
 * 修改影院服务
 * @param {*} id 
 * @param {*} movieServiceObj 
 */
exports.updateMovieService = async function(id, movieServiceObj) {
    movieServiceObj = pick(movieServiceObj, 'name', 'content', 'CinemaId');
    return await MovieService.update(movieServiceObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除影院服务
 * @param {*} id 
 */
exports.deleteMovieService = async function(id) {
    return await MovieService.destroy({
        where: {
            id,
        }
    })
}

/**
 * 通过ID查找影院服务
 * @param {*} id 
 */
exports.getMovieServiceFindById = async function(id) {
    const result = await MovieService.findByPk(id, {
        include: Cinema
    })
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 按条件查询影院服务
 * @param {*} page 
 * @param {*} limit 
 * @param {*} options 
 */
exports.getMovieServiceFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'name', 'content', 'CinemaId');

    const where = {};
    if ('name' in options) {
        where.name = {
            [Op.like]: `%${options.name}%`
        }
    }
    if ('content' in options) {
        where.content = {
            [Op.like]: `%${options.content}%`
        }
    }
    if ('CinemaId' in options) {
        where.CinemaId = options.CinemaId
    }

    const result = await MovieService.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'name', 'content', 'CinemaId'],
        include: Cinema
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}