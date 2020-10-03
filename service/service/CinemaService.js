const Cinema = require('../models/Table/Cinema');
const City = require('../models/Table/City');

exports.addCinema = async function(cinemaObj){
    const result = await Cinema.create(cinemaObj);
    return result.toJSON();
}

exports.getCinemafindById = async function(id){
    let result = await Cinema.findByPk(id, {
        include: City
    });
    if (result) {
        return result.toJSON();
    }
    return null;
}