const data = require('./CinemaData');

const cityService = require('../service/CityService');
const CinemaService = require('../service/CinemaService');


async function getCityId() {
    for (const item of data) {
        item.imgUrl = 'https://p1.meituan.net/mogu/af21459e37c48bf36978cbb71e7ba0b1151928.jpg@292w_292h_1e_1c';
        const res = await cityService.getCityList(1, 1, item.cityName)
        try {
            await test(item, res.data[0].id);
        } catch {

        }
    }
}
getCityId()

async function test(item, CityId) {
    item.CityId = CityId;
    return CinemaService.addCinema({
        name: item.cinemaName,
        address: item.address,
        mobile: item.telephone,
        imgUrl: item.imgUrl,
        CityId: item.CityId
    })
}