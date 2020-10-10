const express = require('express');
const CommentService = require('../../service/CommentService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

/**
 * 获取所有评论
 */
router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const content = req.query.content || "";
    const score = req.query.score || "";
    const likes = req.query.likes || "";
    const publishDate = req.query.publishdate || "";
    const UserId = req.query.userid || "";
    const MovieId = req.query.movieid || "";
    return await CommentService.getCommentFindAll(page, limit, {
        content,
        score,
        likes,
        publishDate,
        UserId,
        MovieId
    });
}));

/**
 * 通过ID获取评论
 */
router.get('/:id', asyncHandler(async (req, res) => {
    return await CommentService.getCommentFindById(req.params.id);
}));

/**
 * 添加评论
 */
router.post('/', asyncHandler(async (req, res) => {
    if (req.token.UserId || req.token.AdminId) {
        return await CommentService.addComment(req.body);
    } else {
        res.status(403).send(sendMsg(403, "没有权限访问该接口！"));
    }

}));

/**
 * 修改评论信息
 */
router.put('/:id', asyncHandler(async (req, res) => {
    return await CommentService.updateComment(req.params.id, req.body);
}));

/**
 * 通过ID删除评论
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    return await CommentService.deleteComment(req.params.id);
}));

module.exports = router;