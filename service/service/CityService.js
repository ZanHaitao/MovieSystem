const { async } = require('validate.js');
const City = require('../models/Table/City');
const Op = require('sequelize').Op;
const { pick } = require('../util/propertayHelper');

/**
 * 添加城市
 * @param {*} cityObj 
 */
exports.addCity = async function(cityObj) {
    cityObj = pick(cityObj, 'province', 'city');
    const ins = await City.create(cityObj);
    return ins.toJSON();
}

/**
 * 修改城市信息
 * @param {*} id 
 * @param {*} cityObj 
 */
exports.updateCity = async function(id, cityObj) {
    cityObj = pick(cityObj, 'province', 'city');
    return await City.update(cityObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除城市
 * @param {*} id 
 */
exports.deleteCity = async function(id) {
    return await City.destroy({
        where: {
            id,
        }
    })
}

/**
 * 通过ID查找城市
 * @param {*} id 
 */
exports.getCityFindById = async function(id) {
    const result = await City.findByPk(id)
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 分页条件查询城市
 * @param {*} page 
 * @param {*} limit 
 * @param {*} key 
 */
exports.getCityList = async function(page = 1, limit = 10, key = "") {
    const result = await City.findAndCountAll({
        where: {
            [Op.or]: [{
                city: {
                    [Op.like]: `%${key}%`
                }
            }, {
                province: {
                    [Op.like]: `%${key}%`
                }
            }]
        },
        offset: (page - 1) * limit,
        limit: +limit,
        attributes:['id','province','city']
    });
    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}