const CinemaScreens = require('../models/Table/CinemaScreens');
const Screens = require('../models/Table/Screens');
const Cinema = require('../models/Table/Cinema');
const { pick } = require('../util/propertayHelper');

/**
 * 添加影厅与影院关系
 * @param {*} CinemaScreensObj 
 */
exports.addCinemaScreens = async function(CinemaScreensObj) {
    CinemaScreensObj = pick(CinemaScreensObj, 'ScreenId', 'CinemaId')
    const result = await CinemaScreens.create(CinemaScreensObj);
    return result.toJSON();
}

/**
 * 修改影厅与影院关系
 * @param {*} id 
 * @param {*} CinemaScreensObj 
 */
exports.updateCinemaScreens = async function(id, CinemaScreensObj) {
    CinemaScreensObj = pick(CinemaScreensObj, 'ScreenId', 'CinemaId')
    return await CinemaScreens.update(CinemaScreensObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除影厅与影院关系
 * @param {*} id 
 */
exports.deleteCinemaScreens = async function(id) {
    return await CinemaScreens.destroy({
        where: {
            id,
        }
    })
}

/**
 * 通过ID查找影厅与影院关系
 * @param {*} id 
 */
exports.getCinemaScreensFindById = async function(id) {
    const result = await CinemaScreens.findByPk(id,{
        include: [
            Screens,
            Cinema
        ]
    })
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 按条件查询影厅与影院关系
 * @param {*} page 
 * @param {*} limit 
 * @param {*} options 
 */
exports.getCinemaScreensFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'ScreenId', 'CinemaId');

    const where = {};
    if ('ScreenId' in options) {
        where.ScreenId = options.ScreenId;
    }
    if ('CinemaId' in options) {
        where.CinemaId = options.CinemaId;
    }

    const result = await CinemaScreens.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'ScreenId', 'CinemaId'],
        include: [
            Screens,
            Cinema
        ]
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}