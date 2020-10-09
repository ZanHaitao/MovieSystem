/**
 * 错误处理中间件
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (err, req, res, next) => {
    console.log(err);
    if (err) {
        res.status(403).send({
            code: 403,
            msg: err instanceof Error ? err.message : err
        });
    } else {
        next();
    }
}