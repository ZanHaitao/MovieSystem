const address = require('./cityData');

const cityService = require('../service/CityService');

// 导入城市数据
for (const key in address) {
    for (const item of address[key]) {
        cityService.addCity({
            province: key,
            city: item
        }).then(res => {
            console.log(res);
        })
    }
}