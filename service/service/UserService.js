const User = require('../models/Table/User');
const md5 = require('md5');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");

/**
 * 用户登录
 * @param {*} logindId 
 * @param {*} loginPwd 
 */
exports.loginUser = async function(loginId,loginPwd){
    loginPwd = md5(loginPwd);
    const result = await User.findOne({
        where: {
            loginId,
            loginPwd
        },
        attributes: ['id', 'name', 'loginId', 'sex', 'birthday', 'mobile']
    });
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 添加用户
 * @param {*} userObj 
 */
exports.addUser = async function(userObj) {
    userObj = pick(userObj, 'name', 'loginId', 'loginPwd', 'sex', 'birthday', 'mobile')
    userObj.loginPwd = md5(userObj.loginPwd);
    const result = await User.create(userObj);
    return result.toJSON();
}

/**
 * 修改用户信息
 * @param {*} id 
 * @param {*} userObj 
 */
exports.updateUser = async function(id, userObj) {
    userObj = pick(userObj, 'name', 'loginId', 'loginPwd', 'sex', 'birthday', 'mobile')
    return await User.update(userObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除用户
 * @param {*} id 
 */
exports.deleteUser = async function(id) {
    userObj = pick(userObj, 'name', 'loginId', 'loginPwd', 'sex', 'birthday', 'mobile')
    return await User.destroy({
        where: {
            id,
        }
    })
}

/**
 * 通过ID查找用户
 * @param {*} id 
 */
exports.getUserFindById = async function(id) {
    const result = await User.findByPk(id,{
        attributes: ['id', 'name', 'loginId', 'sex', 'birthday', 'mobile']
    })
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 按条件查询用户
 * @param {*} page 
 * @param {*} limit 
 * @param {*} options 
 */
exports.getUserFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }
    options = pick(options, 'name', 'loginId', 'sex', 'birthday', 'mobile');
    const where = {};
    if ('name' in options && options.name) {
        where.name = {
            [Op.like]: `%${options.name}%`
        }
    }
    if ('loginId' in options && options.name) {
        where.loginId = options.loginId
    }
    if ('sex' in options) {
        if (options.sex != -1 && options.sex == 1 || options.sex == 0) {
            where.sex = options.sex
        }
    }
    if ('birthday' in options && options.birthday) {
        where.birthday = {
            [Op.like]: `%${options.birthday}%`
        }
    }
    if ('mobile' in options && options.mobile) {
        where.mobile = options.mobile
    }
    const result = await User.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'name', 'loginId', 'sex', 'birthday', 'mobile']
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}