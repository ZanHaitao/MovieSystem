const data = require('./cinema4');

const cityService = require('../service/CityService');
const CinemaService = require('../service/CinemaService');
const axios = require('axios');

const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname, './cinema4.js')

const Mock = require('mockjs');

// 模拟用户数据
const result = Mock.mock({
    'datas|1500-2500': [{
        'loginId': /[a-z]{2}[A-Z]{2}[0-9]/,
        'loginPwd': /[a-z]{2}[0-9]{0,5}[A-Z]{2}/,
    }]
}).datas;

async function test() {
    let id = 41;
    while (id <= 60) {
        const result = await axios.get('http://v.juhe.cn/movie/cinemas.search', {
            params: {
                cityid: id,
                key: 'ad92c9595677e5f2190145196a9b0f8f',
                pagesize: 20
            }
        })
        const str = JSON.stringify(result.data.result.data)
        const json = str.slice(1, str.length - 1) + ',';
        await fs.promises.writeFile(filename, json, {
            flag: 'a'
        })
        id++;
    }
    console.log('ok');

}
// test();

async function getCityId() {
    let id = 2663;
    let index = 0;
    for (const item of data) {
        const res = await cityService.getCityFindAll(1, 1, item.cityName)
        console.log(res.data[0].id, item.cityName);
        await ttest(item, res.data[0].id, id, index);
        id++;
        index++;
    }
    console.log('ok');
}
getCityId()

async function ttest(item, CityId, id, index) {
    item.CityId = CityId;
    return CinemaService.updateCinema(id, {
        name: item.cinemaName,
        address: item.address,
        CityId: item.CityId,
        loginId: result[index].loginId,
        loginPwd: result[index].loginPwd,
    })
}