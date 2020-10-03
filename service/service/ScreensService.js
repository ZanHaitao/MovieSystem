const Screens = require('../models/Table/Screens');

exports.addScreens = async function(screensObj){
    const result = await Screens.create(screensObj);
    return result.toJSON();
}