
const City = require('../models/Table/City');
const Op = require('sequelize').Op;

exports.addCity = async function(cityObj) {
    const ins = await City.create(cityObj);
    return ins.toJSON();
}

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
        limit: +limit
    });
    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}