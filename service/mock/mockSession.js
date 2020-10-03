const Session = require('../models/Table/Session');

const showDateArr = [
    '2020-10-01',
    '2020-10-02',
    '2020-10-03',
    '2020-10-04',
    '2020-10-05',
    '2020-10-06',
    '2020-10-07',
    '2020-10-08',
    '2020-10-09',
    '2020-10-10',
    '2020-10-11',
    '2020-10-12',
    '2020-10-13',
    '2020-10-14',
    '2020-10-15',
    '2020-10-16',
    '2020-10-17',
    '2020-10-18',
    '2020-10-19',
    '2020-10-20',
    '2020-10-21',
    '2020-10-22',
    '2020-10-23',
    '2020-10-24',
    '2020-10-25',
    '2020-10-26',
    '2020-10-27',
    '2020-10-28',
    '2020-10-29',
    '2020-10-30',
    '2020-10-31',
]

const showTimeArr = [
    '00:00',
    '00:15',
    '00:30',
    '00:45',
    '01:00',
    '01:15',
    '01:30',
    '01:45',
    '02:00',
    '02:15',
    '02:30',
    '02:45',
    '03:00',
    '03:15',
    '03:30',
    '03:45',
    '04:00',
    '04:15',
    '04:30',
    '04:45',
    '05:00',
    '05:15',
    '05:30',
    '05:45',
    '06:00',
    '06:15',
    '06:30',
    '06:45',
    '07:00',
    '07:15',
    '07:30',
    '07:45',
    '08:00',
    '08:15',
    '08:30',
    '08:45',
    '09:00',
    '09:15',
    '09:30',
    '09:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
    '17:15',
    '17:30',
    '17:45',
    '18:00',
    '18:15',
    '18:30',
    '18:45',
    '19:00',
    '19:15',
    '19:30',
    '19:45',
    '20:00',
    '20:15',
    '20:30',
    '20:45',
    '21:00',
    '21:15',
    '21:30',
    '21:45',
    '22:00',
    '22:15',
    '22:30',
    '22:45',
    '23:00',
    '23:15',
    '23:30',
    '23:45'
]

const languageArr = [
    '国语2D',
    '国语3D',
    '国语IMAX3D',
    '国语IMAX2D',
    '英语3D',
    '英语2D',
    '英语IMAX3D',
    '英语IMAX2D',
]

const priceArr = [
    '29.9',
    '35.9',
    '45.9',
    '55.9',
    '65.9',
    '75.9',
    '85.9',
]

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// 1836 - 2994 影院
// 1-180 影片

const CinemaScreensService = require('../service/CinemaScreensService');
const SessionService = require('../service/SessionService');


async function setData() {
    let CinemaId = 1836;

    while (CinemaId < 2995) {
        const res = await CinemaScreensService.getCinemaScreensFindAll({
            CinemaId:CinemaId
        })
        const screenArr = []; // 影厅
        for (const item of res) {
            screenArr.push(item.Screen.id)
        }
        for (const ScreenId of screenArr) {
            for (let i = 0; i < getRandom(6, 10); i++) {
                const MovieId = getRandom(1, 180);
                for (let j = 0; j < getRandom(7, 10); j++) {
                    const showDate = showDateArr[getRandom(0, showDateArr.length - 1)];
                    const showTime = showTimeArr[getRandom(0, showTimeArr.length - 1)];
                    const language = languageArr[getRandom(0, languageArr.length - 1)];
                    const price = priceArr[getRandom(0, priceArr.length - 1)];

                    await SessionService.addSession({
                        CinemaId,
                        ScreenId,
                        MovieId,
                        showDate,
                        showTime,
                        language,
                        price
                    })
                }
            }
        }
        CinemaId++;
    }
    console.log('数据上传完毕');
}
setData();