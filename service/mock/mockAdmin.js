const Mock = require('mockjs');
const adminService = require('../service/AdminService');

// 模拟用户数据
const result = Mock.mock({
    'datas|100-200':[{
        'name':'@cname',
        'loginId': /[a-z]{2}[A-Z]{2}[0-9]/,
        'loginPwd': /[a-z]{2}[0-9]{0,5}[A-Z]{2}/,
    }]
}).datas;

for (const item of result) {
    adminService.addAdmin(item)
}