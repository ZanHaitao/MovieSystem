require('./Table/Movie');
require('./Table/City');
require('./Table/Comments');
require('./Table/Order');
require('./Table/Screens');
require('./Table/MovieService');
require('./Table/MovieType');
require('./Table/Session');
require('./Table/Admin');
require('./Table/Banner');
require('./Table/CinemaScreens');

const sequelize = require('./db');

sequelize.sync({
    alter: true
}).then(() => {
    console.log("所有模型同步成功");
})