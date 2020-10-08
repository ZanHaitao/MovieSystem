const Order = require('../models/Table/Order');

async function setData(){
    const data = [];
    for (let i = 0; i < 10000; i++) {
        data.push({
            UserId:getRandom(1, 1963),
            MovieId:getRandom(1, 180),
            SessionId:getRandom(346895, 482339),
            CinemaId:getRandom(1863, 2994),
            number:getRandom(1, 5),
        })
    }
    await Order.bulkCreate(data);
    console.log('数据保存成功');
}
setData();

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
