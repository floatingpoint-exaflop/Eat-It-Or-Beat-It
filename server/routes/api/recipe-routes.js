const router = require('express').Router();
const { addRecipe, getRecipes, getSingleRecipe, generalRecipes, commentsOnRecipes } = require('../../controllers/recipe-controller');
const { getComments, getSingleComment, addComment  } = require('../../controllers/comment-controllers');
const { addSavedRecipe } = require('../../controllers/user-controller')


//add a recipe to saved list route will be /
router.route('/').get(getRecipes);

router.route('/:recipeId/').post(addComment).get(commentsOnRecipes);
router.route('/users/:userId/addSavedRecipe').post(addSavedRecipe);


module.exports = router;
