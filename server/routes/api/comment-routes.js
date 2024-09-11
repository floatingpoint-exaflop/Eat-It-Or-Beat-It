const router = require('express').Router();
const { addComment, getAllCommentsByRecipe } = require('../../controllers/comment-controllers')

router.route('/').post(addComment);

router.route('/:recipeId').get(getAllCommentsByRecipe)

module.exports = router