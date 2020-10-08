const Movie = require('../models/Table/Movie');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");
/**
 * 添加电影
 * @param {*} movieObj 
 */
exports.addMovie = async function(movieObj) {
    movieObj = pick(movieObj, 'name', 'region', 'type', 'duration', 'publishDate', 'score', 'income', 'introduce', 'imgUrl')
    const resulst = await Movie.create(movieObj);
    return resulst.toJSON();
}

/**
 * 修改电影信息
 * @param {*} id 
 * @param {*} movieObj 
 */
exports.updateMovie = async function(id, movieObj) {
    movieObj = pick(movieObj, 'name', 'region', 'type', 'duration', 'publishDate', 'score', 'income', 'introduce', 'imgUrl')
    return await Movie.update(movieObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除电影
 * @param {*} id 
 */
exports.deleteMovie = async function(id) {
    return await Movie.destroy({
        where: {
            id,
        }
    })
}

/**
 * 通过ID查找电影
 * @param {*} id 
 */
exports.getMovieFindById = async function(id) {
    const result = await Movie.findByPk(id, {
        attributes: ['id', 'name', 'region', 'type', 'duration', 'publishDate', 'score', 'income', 'introduce', 'imgUrl']
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
exports.getMovieFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'name', 'region', 'type', 'duration', 'publishDate', 'score', 'income', 'introduce');

    const where = {};
    if ('name' in options && options.name) {
        where.name = {
            [Op.like]: `%${options.name}%`
        }
    }
    if ('region' in options && options.region) {
        where.region = {
            [Op.like]: `%${options.region}%`
        }
    }
    if ('type' in options && options.type) {
        where.type = {
            [Op.like]: `%${options.type}%`
        }
    }
    if ('duration' in options && options.duration) {
        where.duration = {
            [Op.like]: `%${options.duration}%`
        }
    }
    if ('publishDate' in options && options.publishDate) {
        where.publishDate = {
            [Op.like]: `%${options.publishDate}%`
        }
    }
    if ('score' in options && options.score) {
        where.score = {
            [Op.like]: `%${options.score}%`
        }
    }
    if ('income' in options && options.income) {
        where.income = {
            [Op.like]: `%${options.income}%`
        }
    }
    if ('introduce' in options && options.introduce) {
        where.introduce = {
            [Op.like]: `%${options.introduce}%`
        }
    }

    const result = await Movie.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'name', 'region', 'type', 'duration', 'publishDate', 'score', 'income', 'introduce', 'imgUrl', 'createdAt']
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}