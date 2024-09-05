const router = require('express').Router();
const { addRecipeApi } = require('../../controllers/recipe-controller');
const { getComments, getSingleComment, addComment  } = require('../../controllers/comment-controllers');


//add a recipe to saved list route will be /
router.route('/').post(addRecipeApi);

router.route('/:recipeId/').post(addComment).get(getComments);

router.route('/:recipeId/commentId').get(getSingleComment);

router
