const types = "爱情 喜剧 动画 剧情 恐怖 惊悚 科幻 动作 悬疑 犯罪 冒险 战争 奇幻 运动 家庭 古装 武侠 西部 历史 传记 歌舞 黑色电影 短片 纪录片 其他".split(' ');
const regions = "大陆 美国 韩国 日本 中国香港 中国台湾 泰国 印度 法国 英国 俄罗斯 意大利 西班牙 德国 波兰 澳大利亚 伊朗 其他".split(' ');
const years = "2020 2019 2018 2017 2016 2015 2014 2013 2012 2011 2000-2010 90年代 80年代 70年代 更早".split(' ');

const MovieType = require('../models/Table/MovieType');

async function setData() {
    await MovieType.bulkCreate(types.map(item => {
        return {
            typeName: item,
            type:'类型'
        }
    }));

    await MovieType.bulkCreate(regions.map(item => {
        return {
            typeName: item,
            type:'区域'
        }
    }));

    await MovieType.bulkCreate(years.map(item => {
        return {
            typeName: item,
            type:'年代'
        }
    }));
    console.log("数据添加成功");
}

setData();