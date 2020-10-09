const Cinema = require('../models/Table/Cinema');
const City = require('../models/Table/City');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");
const md5 = require('md5');


/**
 * 影院登录
 * @param {*} logindId 
 * @param {*} loginPwd 
 */
exports.loginCinema = async function(loginId, loginPwd) {
    loginPwd = md5(loginPwd);
    const result = await Cinema.findOne({
        where: {
            loginId,
            loginPwd
        },
        attributes: ['name', 'loginId', 'address', 'mobile', 'imgUrl', 'CityId']
    });
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 添加影院
 * @param {*} cinemaObj 
 */
exports.addCinema = async function(cinemaObj) {
    cinemaObj = pick(pick, 'name', 'address', 'mobile', 'imgUrl', 'CityId', 'loginId', 'loginPwd')
    cinemaObj.loginPwd = md5(cinemaObj.loginPwd);
    const result = await Cinema.create(cinemaObj);
    return result.toJSON();
}

/**
 * 修改影院信息
 * @param {*} id 
 * @param {*} cinemaObj 
 */
exports.updateCinema = async function(id, cinemaObj) {
    cinemaObj = pick(cinemaObj, 'name', 'address', 'mobile', 'imgUrl', 'CityId', 'loginId', 'loginPwd')
    if (cinemaObj.loginPwd) {
        cinemaObj.loginPwd = md5(cinemaObj.loginPwd);
    }
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
        attributes: ['id', 'name', 'address', 'mobile', 'imgUrl', 'CityId', 'loginId'],
        include: {
            model: City,
            attributes: ['id', 'province', 'city']
        }
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

    options = pick(options, 'name', 'address', 'mobile', 'CityId', 'loginId');

    const where = {};
    if ('name' in options && options.name) {
        where.name = {
            [Op.like]: `%${options.name}%`
        }
    }
    if ('address' in options && options.address) {
        where.address = {
            [Op.like]: `%${options.address}%`
        }
    }
    if ('CityId' in options && options.CityId) {
        where.CityId = options.CityId
    }
    if ('mobile' in options && options.mobile) {
        where.mobile = options.mobile
    }
    if ('loginId' in options && options.loginId) {
        where.loginId = options.loginId
    }
    const result = await Cinema.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'name', 'address', 'mobile', 'imgUrl', 'CityId', 'createdAt', 'loginId'],
        include: {
            model: City,
            attributes: ['id', 'province', 'city']
        },
        // order: [
        //     ['id', 'DESC']
        // ]
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}