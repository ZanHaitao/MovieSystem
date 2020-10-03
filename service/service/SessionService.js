const Session = require('../models/Table/Session');

exports.addSession = async function(sessionObj){
    const result = await Session.create(sessionObj);
    return result.toJSON();
}