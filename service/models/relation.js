const User = require('./Table/User');
const Cinema = require('./Table/Cinema');
const Movie = require('./Table/Movie');
const City = require('./Table/City');
const Comments = require('./Table/Comments');
const Order = require('./Table/Order');
const Screens = require('./Table/Screens');
const MovieService = require('./Table/MovieService');
const Session = require('./Table/Session');
const CinemaScreens = require('./Table/CinemaScreens');

// 影院关系
City.hasMany(Cinema);
Cinema.belongsTo(City);

// 电影评价关系
User.hasMany(Comments);
Comments.belongsTo(User);
Movie.hasMany(Comments);
Comments.belongsTo(Movie);

// 电影场次关系
Cinema.hasMany(Session);
Session.belongsTo(Cinema);
Movie.hasMany(Session);
Session.belongsTo(Movie);
Screens.hasMany(Session);
Session.belongsTo(Screens);

// 影厅信息关系
Cinema.hasMany(CinemaScreens);
CinemaScreens.belongsTo(Cinema);
Screens.hasMany(CinemaScreens);
CinemaScreens.belongsTo(Screens);

// 影院服务关系
Cinema.hasMany(MovieService);
MovieService.belongsTo(Cinema);

// 订单管理关系
Cinema.hasMany(Order);
Order.belongsTo(Cinema);
User.hasMany(Order);
Order.belongsTo(User);
Movie.hasMany(Order);
Order.belongsTo(Movie);
Session.hasMany(Order);
Order.belongsTo(Session);