const Admin = require('../models/Table/Admin');
const md5 = require('md5');

exports.addAdmin = async function(adminObj){
    adminObj.loginPwd = md5(adminObj.loginPwd);
    const result = await Admin.create(adminObj);
    return result.toJSON();
}