const Admin = require('../models/Table/Admin');
const md5 = require('md5');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");

/**
 * 管理员登录
 * @param {*} logindId 
 * @param {*} loginPwd 
 */
exports.loginAdmin = async function(loginId, loginPwd) {
    loginPwd = md5(loginPwd);
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        },
        attributes: ['id', 'name', 'loginId', 'type']
    });
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 添加管理员
 * @param {*} adminObj 管理员对象
 */
exports.addAdmin = async function(adminObj) {
    adminObj = pick(adminObj, 'name', 'loginId', 'loginPwd', 'type');
    adminObj.loginPwd = md5(adminObj.loginPwd);
    const result = await Admin.create(adminObj);
    return result.toJSON();
}

/**
 * 修改管理员信息
 * @param {*} id 
 * @param {*} adminObj 
 */
exports.updateAdmin = async function(id, adminObj) {
    adminObj = pick(adminObj, 'name', 'loginId', 'loginPwd', 'type');
    if (adminObj.loginPwd) {
        adminObj.loginPwd = md5(adminObj.loginPwd);
    }
    return await Admin.update(adminObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除管理员
 * @param {*} id 
 */
exports.deleteAdmin = async function(id) {
    return await Admin.destroy({
        where: {
            id,
        }
    })
}

/**
 * 通过ID查找管理员
 * @param {*} id 
 */
exports.getAdminFindById = async function(id) {
    const result = await Admin.findByPk(id, {
        attributes: ['id', 'name', 'loginId', 'createdAt', 'type']
    })
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 按条件查找管理员
 * @param {*} page 
 * @param {*} limit 
 * @param {*} options 
 */
exports.getAdminList = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'name', 'loginId', 'type');
    const where = {};
    if ('name' in options && options.name) {
        where.name = {
            [Op.like]: `%${options.name}%`
        }
    }
    if ('loginId' in options && options.loginId) {
        where.loginId = options.loginId;
    }
    if ('type' in options && options.type) {
        where.type = options.type
    }

    const result = await Admin.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'name', 'loginId', 'createdAt', 'type']
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}