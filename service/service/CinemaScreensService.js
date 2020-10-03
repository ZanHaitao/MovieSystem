const CinemaScreens = require('../models/Table/CinemaScreens');
const Screens = require('../models/Table/Screens');
const Cinema = require('../models/Table/Cinema');

exports.addCinemaScreens = async function(CinemaScreensObj) {
    const result = await CinemaScreens.create(CinemaScreensObj);
    return result.toJSON();
}

/**
 * 根据影院id获取全部影厅
 * @param {*} id 
 */
exports.getCinemaScreensListById = async function(CinemaId) {
    const result = await CinemaScreens.findAll({
        where: {
            CinemaId,
        },
        include: Screens
    });
    if (result) {
        return JSON.parse(JSON.stringify(result));
    }
    return null;

}