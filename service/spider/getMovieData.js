const axios = require('axios');
const cheerio = require('cheerio');
const Movie = require('../models/Table/Movie');
const Comments = require('../models/Table/Comments');
const movieData = require('./test');
const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname, './test.json');

/**
 * 获取电影HTML页面
 */
async function getMovieHTML() {
    const resp = await axios.get('https://maoyan.com/films?showType=3&offset=150');
    return cheerio.load(resp.data);
}
// getMovieHTML();
/**
 * 解析电影列表
 */
async function getMovieLinks() {
    const $ = await getMovieHTML();
    const list = $(".movies-panel dl.movie-list dd a").map((i, item) => {
        return "https://maoyan.com" + $(item).attr('href');
    }).toArray();

    const movieLits = [];

    for (let i = 0; i < list.length; i++) {
        if (movieLits.indexOf(list[i]) === -1) {
            movieLits.push(list[i])
        }
    }

    return movieLits;
}

/**
 * 解析电影信息
 * @param {*} link 
 */
async function getMovieDetail(link) {
    const resp = await axios.get(link);
    const $ = cheerio.load(resp.data);
    const name = $("h1.name").text();
    const detail = $("li.ellipsis");
    const type = $(detail[0]).text().trim().split('\n').map(i => i.trim()).join(" ");
    const region = $(detail[1]).text().trim().split('/').map(i => i.trim())[0];
    const duration = $(detail[1]).text().trim().split('/').map(i => i.trim())[1];
    const publishDate = $(detail[2]).text().trim();
    const score = getRandom(7, 9);
    const income = getRandom(1, 15);
    const imgUrl = $(".banner img.avatar").attr('src');
    const introduce = $(".container span.dra").text();
    const comments = $(".comment-container ").map((i, item) => {
        const publishDate = $(item).find('.time span').text();
        const score = $(item).find('.score-star').attr('data-score');
        const likes = $(item).find('.approve  .num').text();
        const content = $(item).find('.comment-content').text().trim();
        const UserId = Math.floor(getRandom(1, 1000));
        return {
            publishDate,
            score,
            likes,
            content,
            UserId
        }
    }).toArray();
    return {
        link,
        name,
        type,
        region,
        duration,
        publishDate,
        score,
        income,
        introduce,
        imgUrl,
        comments,
    }
}

/**
 * 获取数据
 */
async function getData() {
    const links = await getMovieLinks();
    const dataArr = [];
    for (const item of links) {
        dataArr.push(getMovieDetail(item));
    }
    let data = await Promise.all(dataArr);

    let id = 151;
    for (const item of data) {
        item.id = id;
        id++;
    }

    const result = JSON.stringify(data);
    await fs.promises.writeFile(filename, result, {
        flag: 'a'
    });
    console.log('写入成功');
}

// getData()


function getRandom(min, max) {
    return (Math.random() * (max - min + 1) + min).toFixed(1);
}

async function setData() {
    // 电影数据导入
    // const result = movieData.map(item => {
    //     return {
    //         name: item.name,
    //         type: item.type,
    //         region: item.region,
    //         duration: item.duration,
    //         publishDate: item.publishDate,
    //         score: item.score,
    //         income: item.income,
    //         introduce: item.introduce,
    //         imgUrl: item.imgUrl,
    //     }
    // })
    // await Movie.bulkCreate(movieData);
    // console.log("数据保存成功！");

    // 评论数据导入
    const data = [];

    for (let i = 0; i < movieData.length; i++) {
        const item = movieData[i].comments;
        for (let j = 0; j < item.length; j++) {
            data.push({
                UserId: item[j].UserId.toString(),
                MovieId: movieData[i].id.toString(),
                content: item[j].content,
                score:item[j].score,
                likes:item[j].likes,
                publishDate:item[j].publishDate
            });
            
        }
    }

    await Comments.bulkCreate(data);
    console.log("数据保存成功！");
}
setData()