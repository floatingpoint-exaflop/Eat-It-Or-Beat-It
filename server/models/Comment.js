const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentBody: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    recipe: {
        type: String
    }
    // // Reference to the user who made the comment
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    // // Reference to the recipe being commented on
    // recipe: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Recipe',
    //     required: true,
    // },
}, {
    timestamps: true, // createdAt and updatedAt
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;