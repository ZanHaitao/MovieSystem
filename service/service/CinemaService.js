const Cinema = require('../models/Table/Cinema');
const City = require('../models/Table/City');
const { pick } = require('../util/propertayHelper');

/**
 * 添加影院
 * @param {*} cinemaObj 
 */
exports.addCinema = async function(cinemaObj) {
    cinemaObj = pick(pick, 'name', 'address', 'mobile', 'imgUrl', 'CityId')
    const result = await Cinema.create(cinemaObj);
    return result.toJSON();
}

/**
 * 修改影院信息
 * @param {*} id 
 * @param {*} cinemaObj 
 */
exports.updateCinema = async function(id, cinemaObj) {
    cinemaObj = pick(pick, 'name', 'address', 'mobile', 'imgUrl', 'CityId')
    return await Cinema.update(cinemaObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除影院
 * @param {*} id 
 */
exports.deleteCinema = async function(id) {
    return await Cinema.destroy({
        where: {
            id,
        }
    })
}

/**
 * 根据影院id查找
 * @param {*} id 
 */
exports.getCinemaFindById = async function(id) {
    let result = await Cinema.findByPk(id, {
        include: City
    });
    if (result) {
        return result.toJSON();
    }
    return null;
}


/**
 * 按条件查询影院
 * @param {*} page 
 * @param {*} limit 
 * @param {*} options 
 */
exports.getCinemaFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'name', 'address', 'mobile', 'CityId');

    const where = {};
    if ('name' in options) {
        where.name = {
            [Op.like]: `%${options.name}%`
        }
    }
    if ('address' in options) {
        where.address = {
            [Op.like]: `%${options.address}%`
        }
    }
    if ('CityId' in options) {
        where.CityId = {
            [Op.like]: `%${options.CityId}%`
        }
    }
    if ('mobile' in options) {
        where.mobile = options.mobile
    }

    const result = await Cinema.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'name', 'address', 'mobile', 'imgUrl', 'CityId'],
        include:City
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}