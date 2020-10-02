const { async } = require('validate.js');
const Cinema = require('../models/Table/Cinema');

exports.addCinema = async function(cinemaObj){
    const result = await Cinema.create(cinemaObj);
    return result.toJSON();
}