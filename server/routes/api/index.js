const router = require('express').Router();
const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');
const externalRoutes = require('./external-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/recipe', externalRoutes);
router.use('/comment', commentRoutes);


// console.log(userRoutes)
// console.log(recipeRoutes)

module.exports = router;
