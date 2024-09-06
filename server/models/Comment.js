const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentBody: {
        type: String
    },
    rating: {
        type: Number
    },
    apiRecipeId: {
        type: String
    }

});

const Comment = model('Comment', commentSchema);

module.exports = Comment

//things we need to track on the comment
// commentBody
// apiRecipeId
// user that commented on it
// userId of the commenter

