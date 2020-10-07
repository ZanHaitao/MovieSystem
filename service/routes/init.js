const express = require('express');
const path = require('path');
const app = express();
var history = require('connect-history-api-fallback');

// 监听端口
const port = 80;
app.listen(port, () => {
    console.log("服务器启动成功 访问：http://localhost");
})

// 处理单页应用
app.use(history());

// 处理静态资源中间件
const statcRoot = path.resolve(__dirname, '../public');
app.use(express.static(statcRoot));

// 处理cors跨域
const cors = require('cors');
app.use(cors());

// 处理cookie
const cookieParse = require('cookie-parser');
app.use(cookieParse());

// jwt 登录验证
app.use(require('./middleware/tokenMiddleware'));

// 解析 application/x-www-form-urlencoded 请求体
app.use(express.urlencoded({
    extended: true
}));

// 解析 application/json 请求体
app.use(express.json());

// api处理
app.use('/api/admin',require('./api/AdminRouter'));
app.use('/api/banner',require('./api/Banner'));
app.use('/api/cinema',require('./api/CinemaRouter'));
app.use('/api/cinemascreens',require('./api/CinemaScreensRouter'));
app.use('/api/city',require('./api/CityRouter'));
app.use('/api/comments',require('./api/CommentsRouter'));
app.use('/api/movie',require('./api/MovieRouter'));
app.use('/api/movieserver',require('./api/MovieServerRouter'));
app.use('/api/movietype',require('./api/MovieTypeRouter'));
app.use('/api/order',require('./api/OrderRouter'));
app.use('/api/screens',require('./api/ScreensRouter'));
app.use('/api/session',require('./api/SessionRouter'));
app.use('/api/user',require('./api/UserRouter'));

// 处理报错中间件
app.use(require('./middleware/errorMiddleware'));