const Comments = require('../models/Table/Comments');

exports.addComment = async function(commentObj){
    const ins = await Comments.create(commentObj);
    return ins.toJSON();
}