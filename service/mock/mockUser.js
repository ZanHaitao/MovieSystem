const Mock = require('mockjs');
const userService = require('../service/UserService');

// 模拟用户数据
const result = Mock.mock({
    'datas|1500-2500':[{
        'name':'@cname',
        'loginId': /[a-z]{2}[A-Z]{2}[0-9]/,
        'loginPwd': /[a-z]{2}[0-9]{0,5}[A-Z]{2}/,
        'birthday':'@date',
        'sex|1-2':true,
        'mobile':/1\d{10}/,
    }]
}).datas;

for (const item of result) {
    userService.addUser(item)
}