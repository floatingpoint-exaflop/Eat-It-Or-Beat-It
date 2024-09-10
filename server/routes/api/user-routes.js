const router = require('express').Router();
const { addRecipe, getRecipes } = require('../../controllers/recipe-controller');
const { getUsers, getComments, createUser, getCurrentUser, login } = require('../../controllers/user-controller');

// Import middleware
// const { authMiddleware } = require('../../utils/auth');

// Route to get all users
router.route('/').get(getUsers);

// Route to add a new user
router.route('/').post(createUser);

// Route for user login
router.route('/login').post(login);

// Route to get comments for a specific user by userId
router.route('/:userId/comments').get(getComments); // Changed to use dynamic userId

// Route to get saved recipes for a specific user by userId
router.route('/:userId/savedrecipes').get(getRecipes);

// Route to update a user (uncomment and implement if needed)
// router.route('/:userId').put(updateUser);

// Route to get recipes for a specific user by userId
router.route('/:userId/recipe').get(getRecipes);

module.exports = router;






// const router = require('express').Router();
// const { addRecipe, getRecipes } = require('../../controllers/recipe-controller');

// const { getUsers,getComments, createUser, getCurrentUser, login } = require('../../controllers/user-controller');

// // // import middleware
// // const { authMiddleware } = require('../../utils/auth');

// // put authMiddleware anywhere we need to send a token for verification of user

// router.route('/').get(getUsers)

// //add a user to the list of users route will be api/users/
// router.route('/').post(createUser)
// router.route('/login').post(login)
// router.route('/userId/comments').get(getComments);
// router.route('/userId/savedrecipes').get(getRecipes)

// //udpate a user, route will be /api/users/:userId
// // router.route('/:userId').put(updateUser);

// //add a recipe to saved list route will be /user/:userId/savedrecipe
// router.route('/:userId/recipe').get(getRecipes);

// module.exports = router;
