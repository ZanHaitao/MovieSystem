const Admin = require('../models/Table/Admin');
const md5 = require('md5');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");

/**
 * 管理员登录
 * @param {*} logindId 
 * @param {*} loginPwd 
 */
exports.loginAdmin = async function(loginId,loginPwd){
    loginPwd = md5(loginPwd);
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        },
        attributes: ['id', 'name', 'loginId']
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
    adminObj = pick(adminObj, 'name', 'loginId', 'loginPwd');
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
    adminObj = pick(adminObj, 'name', 'loginId', 'loginPwd');
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
    const result = await Admin.findByPk(id,{
        attributes: ['id', 'name', 'loginId']
    })
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 按条件查询管理员
 * @param {*} page 页数
 * @param {*} limit 显示数据
 * @param {*} name 姓名
 * @param {*} loginId 用户名
 */
exports.getAdminFindAll = async function(page = 1, limit = 10, name = "", loginId = "") {
    const where = {};
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`
        }
    }
    if (loginId) {
        where.loginId = loginId;
    }

    const result = await Admin.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'name', 'loginId']
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}