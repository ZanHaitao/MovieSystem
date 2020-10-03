const Comments = require('../models/Table/Comments');
const { pick } = require('../util/propertayHelper');
const User = require('../models/Table/User');
const Movie = require('../models/Table/Movie');

/**
 * 添加评论
 * @param {*} commentObj 
 */
exports.addComment = async function(commentObj) {
    commentObj = pick(commentObj, 'content', 'score', 'likes', 'publishDate', 'UserId', 'MovieId')
    const ins = await Comments.create(commentObj);
    return ins.toJSON();
}

/**
 * 修改评论
 * @param {*} id 
 * @param {*} commentObj 
 */
exports.updateComment = async function(id, commentObj) {
    commentObj = pick(commentObj, 'content', 'score', 'likes', 'publishDate', 'UserId', 'MovieId')
    return await Comments.update(commentObj, {
        where: {
            id,
        }
    })
}

/**
 * 删除评论
 * @param {*} id 
 */
exports.deleteComment = async function(id) {
    return await Comments.destroy({
        where: {
            id,
        }
    })
}

/**
 * 通过ID查找评论
 * @param {*} id 
 */
exports.getCommentsFindById = async function(id) {
    const result = await Comments.findByPk(id, {
        include: [
            User,
            Movie
        ]
    })
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 按条件查询评论
 * @param {*} page 
 * @param {*} limit 
 * @param {*} options 
 */
exports.getCommentsFindAll = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'content', 'score', 'likes', 'publishDate', 'UserId', 'MovieId');
    const where = {};
    if ('content' in options) {
        where.content = {
            [Op.like]: `%${options.content}%`
        }
    }
    if ('score' in options) {
        where.score = {
            [Op.like]: `%${options.score}%`
        }
    }
    if ('likes' in options) {
        where.likes = options.likes
    }
    if ('publishDate' in options) {
        where.publishDate = {
            [Op.like]: `%${options.publishDate}%`
        }
    }
    if ('UserId' in options) {
        where.UserId = options.UserId
    }
    if ('MovieId' in options) {
        where.MovieId = options.MovieId
    }

    const result = await Comments.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        attributes: ['id', 'content', 'score', 'likes', 'publishDate', 'UserId', 'MovieId'],
        include: [
            User,
            Movie
        ]
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}