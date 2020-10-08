const jwt = require('jsonwebtoken');
const cookieKey1 = 'userToken';
const cookieKey2 = 'adminToken';
const cookieKey3 = 'cinemaToken';
// jwt密钥
const secret1 = 'aDcCLxa';
const secret2 = 'cDaCAxa';
const secret3 = 'AxacSDa';

/**
 * 颁布jwt
 */
exports.publish = (res, maxAge = 3600 * 24 * 1000, options = {}, type = 'user') => {
    let token;

    if (type === 'user') {
        token = jwt.sign(options, secret1, {
            expiresIn: maxAge
        })
    } else if (type === 'admin') {
        
        token = jwt.sign(options, secret2, {
            expiresIn: maxAge
        })
    } else {
        token = jwt.sign(options, secret3, {
            expiresIn: maxAge
        })
    }

    // 添加 Authorization
    res.header('Authorization', token);

}

/**
 * 验证jwt
 */
exports.verify = (req, type = 'user') => {
    let token;
    if (type === 'user') {
        token = req.cookies[cookieKey1];
    } else if (type === 'admin') {
        token = req.cookies[cookieKey2];
    } else {
        token = req.cookies[cookieKey3];
    }

    if (!token) {
        token = req.headers.authorization;
        if (!token) {
            //没有token
            return null;
        }
        token = token.split(" ");
        token = token.length === 1 ? token[0] : token[1];
    }
    try {
        if (type === 'user') {
            return jwt.verify(token, secret1);
        } else if (type === 'admin') {
            return jwt.verify(token, secret2);
        } else {
            return jwt.verify(token, secret3);
        }
    } catch (error) {
        return null;
    }
}