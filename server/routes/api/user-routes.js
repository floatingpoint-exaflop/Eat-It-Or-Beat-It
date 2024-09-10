const router = require('express').Router();
const { addRecipe, getRecipes } = require('../../controllers/recipe-controller');

const { getUsers, createUser, getCurrentUser, login } = require('../../controllers/user-controller');

// // import middleware
// const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user

router.route('/').get(getUsers)

//add a user to the list of users route will be api/users/
router.route('/').post(createUser)
router.route('/login').post(login)
router.route('/comments').get(getRecipes);

//udpate a user, route will be /api/users/:userId
// router.route('/:userId').put(updateUser);

//add a recipe to saved list route will be /user/:userId/savedrecipe
// router.route('/:userId/recipe/:recipeId').get(getRecipes);

module.exports = router;
