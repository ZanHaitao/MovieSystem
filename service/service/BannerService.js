const { async } = require('validate.js');
const Banner = require('../models/Table/Banner');
const { pick } = require('../util/propertayHelper');

/**
 * 添加Banner广告
 * @param {*} bannerObj 
 */
exports.addBanner = async function(bannerObj) {
    bannerObj = pick(bannerObj, 'title', 'imgUrl');
    const result = await Banner.create(bannerObj);
    return result.toJSON();
}

/**
 * 修改Banner广告
 * @param {*} id 
 * @param {*} bannerObj 
 */
exports.updateBanner = async function(id, bannerObj) {
    bannerObj = pick(bannerObj, 'title', 'imgUrl');
    return await Banner.update(bannerObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除Banner广告
 * @param {*} id 
 */
exports.deleteBanner = async function(id) {
    return await Banner.destroy({
        where: {
            id,
        }
    })
}

/**
 * 通过ID查找电影
 * @param {*} id 
 */
exports.getBannerFindById = async function(id) {
    const result = await Banner.findByPk(id)
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
exports.getBannerFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'title');

    const where = {};
    if ('title' in options) {
        where.title = {
            [Op.like]: `%${options.title}%`
        }
    }

    const result = await Banner.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'title', 'imgUrl']
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}