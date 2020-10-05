/**
 * 错误处理中间件
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (err, req, res, next) => {
    if (err) {
        res.status(500).send({
            code: 500,
            msg: err instanceof Error ? err.message : err
        });
    } else {
        next();
    }
}