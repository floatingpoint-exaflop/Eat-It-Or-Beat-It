const router = require('express').Router();
const { addRecipe, getRecipes, getSingleRecipe } = require('../../controllers/recipe-controller');
const { getComments, getSingleComment, addComment  } = require('../../controllers/comment-controllers');


//add a recipe to saved list route will be /
router.route('/').get(getRecipes);

router.route('/:recipeId/').post(addComment).get(getComments);

router.route('/:recipeId/commentId').get(getSingleComment);

module.exports = router;