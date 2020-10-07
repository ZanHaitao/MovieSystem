const SessionService = require('../service/SessionService');


async function test(req) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 9999999999999999;
    const showDate = req.query.showdate || "";
    const showTime = req.query.showtime || "";
    const language = req.query.language || "";
    const price = req.query.price || "";
    const CinemaId = req.query.cinemaid || "";
    const ScreenId = req.query.screenid || "";
    const MovieId = req.query.movieid || "";
    return await SessionService.getSessionFindAll(page, limit, {
        showDate,
        showTime,
        language,
        price,
        CinemaId,
        ScreenId,
        MovieId
    });
};


async function set() {
    const res = await test({
        query: {}
    });
    console.log(res.data.length);
    // for (const item of res.data) {
    //     console.log(item.id);
    //     await SessionService.updateSession(item.id, {
    //         seat: item.Screen.seat
    //     });

    // }

    console.log('完成');
}

set()