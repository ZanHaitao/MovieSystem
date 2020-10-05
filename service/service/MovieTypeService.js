const MovieType = require('../models/Table/MovieType');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");
/**
 * 添加电影类别
 * @param {*} movieTypeObj 
 */
exports.addMovieType = async function(movieTypeObj) {
    movieTypeObj = pick(movieTypeObj, 'typeName', 'type');
    const result = await MovieType.create(movieTypeObj);
    return result.toJSON();
}

/**
 * 修改电影类别
 * @param {*} id 
 * @param {*} movieTypeObj 
 */
exports.updateMovieType = async function(id, movieTypeObj) {
    movieTypeObj = pick(movieTypeObj, 'typeName', 'type');
    return await MovieType.update(movieTypeObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除电影类别
 * @param {*} id 
 */
exports.deleteMovieType = async function(id) {
    return await MovieType.destroy({
        where: {
            id,
        }
    })
}


/**
 * 通过ID查找电影类别
 * @param {*} id 
 */
exports.getMovieTypeFindById = async function(id) {
    const result = await MovieType.findByPk(id,{
        attributes: ['id', 'typeName', 'type']
    })
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 按条件查询电影类别
 * @param {*} page 
 * @param {*} limit 
 * @param {*} options 
 */
exports.getMovieTypeFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'typeName', 'type');

    const where = {};
    if ('typeName' in options && options.typeName) {
        where.typeName = {
            [Op.like]: `%${options.typeName}%`
        }
    }
    if ('type' in options && options.type) {
        where.type = {
            [Op.like]: `%${options.type}%`
        }
    }

    const result = await MovieType.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'typeName', 'type']
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}