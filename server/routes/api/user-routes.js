const router = require('express').Router();
const { createUser, getCurrentUser, addRecipeApi } = require('../../controllers/user-controller');

// // import middleware
// const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user

//add a user to the list of users route will be api/users/
router.route('/').post(createUser)

//udpate a user, route will be /api/users/:userId
router.route('/:userId').put(updateUser);

//add a recipe to saved list route will be /user/:userId/savedrecipe
router.route('/:userId/savedrecipe').post(addRecipeApi);

module.exports = router;
