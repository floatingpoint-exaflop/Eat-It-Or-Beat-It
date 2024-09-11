const router = require('express').Router();
const { getRecipes, saveRecipeToDatabase } = require('../../controllers/recipe-controller');
const { getUsers, getComments, createUser, getCurrentUser, login } = require('../../controllers/user-controller');


// Route to get all users; site isn't using this one but Pm can
router.route('/').get(getUsers);

// Route for user login - do NOT touch this unless it's to enhance session.
router.route('/login').post(login);

// router.route('/').get(getUsers)
router.route('/:userId').post(saveRecipeToDatabase).get(getCurrentUser);

// Route to add a new user
router.route('/').post(createUser);


// Route to get comments for a specific user by userId
router.route('/:userId/comments').get(getComments); // Changed to use dynamic userId

// Route to get saved recipes for a specific user by userId
router.route('/:userId/savedrecipes').get(getRecipes);

// Route to update a user (uncomment and implement if needed)
// router.route('/:userId').put(updateUser);
//add a recipe to saved list route will be /user/:userId/savedrecipe
// router.route('/:userId/recipe/:recipeId').get(getRecipes);

module.exports = router;