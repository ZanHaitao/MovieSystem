const serviceArr = [{
        label: '改签',
        content: '未取票用户放映前60分钟可改签'
    },
    {
        label: '3D眼镜',
        content: '免押金'
    },
    {
        label: '儿童优惠',
        content: '1.3米以下儿童可免费无座观影（VIP厅、IMAX厅除外），一名成人限带一名儿童..'
    },
    {
        label: '可停车',
        content: '可免费停车，凭票根至前台领取停车票。'
    },
    {
        label: '退',
        content: '未取票用户放映前60分钟可退票'
    },
    {
        label: '情侣座',
        content: '甜蜜情侣厅'
    },
    {
        label: '安心影院',
        content: '每日消毒，隔座售卖，全员佩戴口罩，进门需体温测量'
    }
]

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// 1836 - 2994

const MovieService = require('../models/Table/MovieService');


async function setData() {
    const data = [];
    let CinemaId = 1863;
    while (CinemaId < 2995) {

        const labelNum = getRandom(3, 5);
        let lableData = [];
        for (let i = 0; i < labelNum; i++) {
            const data = serviceArr[getRandom(0, serviceArr.length - 1)]
            if (!lableData.includes(data)) {
                lableData.push(data);
            } else {
                i--;
            }
        }
        for (const item of lableData) {
            data.push({
                CinemaId:CinemaId,
                name:item.label,
                content:item.content
            })
        }
        
        CinemaId++;
    }
    await MovieService.bulkCreate(data);
    console.log('数据写入成功');
}
setData()