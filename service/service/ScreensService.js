const Screens = require('../models/Table/Screens');
const { pick } = require('../util/propertayHelper');

/**
 * 添加影厅
 * @param {*} screensObj 
 */
exports.addScreens = async function(screensObj) {
    screensObj = pick(screensObj, 'name', 'people', 'seat')
    const result = await Screens.create(screensObj);
    return result.toJSON();
}

/**
 * 修改影厅信息
 * @param {*} id 
 * @param {*} screensObj 
 */
exports.updateScreen = async function(id, screensObj) {
    screensObj = pick(screensObj, 'name', 'people', 'seat')
    return await Screens.update(screensObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除影厅
 * @param {*} id 
 */
exports.deleteScreen = async function(id) {
    return await Screens.destroy({
        where: {
            id,
        }
    })
}


/**
 * 通过ID查找影厅
 * @param {*} id 
 */
exports.getScreensFindById = async function(id) {
    const result = await Screens.findByPk(id)
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 按条件查询影厅
 * @param {*} page 
 * @param {*} limit 
 * @param {*} options 
 */
exports.getScreensFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'name', 'people');

    const where = {};
    if ('name' in options) {
        where.name = {
            [Op.like]: `%${options.name}%`
        }
    }
    if ('people' in options) {
        where.people = {
            [Op.like]: `%${options.people}%`
        }
    }

    const result = await Screens.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'name', 'people', 'seat']
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}