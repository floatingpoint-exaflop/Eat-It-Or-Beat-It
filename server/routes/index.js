const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');
// const {addSavedRecipe} = require('../controllers/recipe-controller');


router.use('/', apiRoutes);
// router.route('/').post(addSavedRecipe)

module.exports = router;
