const User = require('../models/Table/User');
const md5 = require('md5');

exports.addUser = async function(userObj){
    userObj.loginPwd = md5(userObj.loginPwd);
    const result = await User.create(userObj);
    return result.toJSON();
}