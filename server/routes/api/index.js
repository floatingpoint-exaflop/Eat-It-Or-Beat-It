const router = require('express').Router();
const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');
const externalRoutes = require('./external-routes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/recipe', externalRoutes);


// console.log(userRoutes)
// console.log(recipeRoutes)

module.exports = router;
