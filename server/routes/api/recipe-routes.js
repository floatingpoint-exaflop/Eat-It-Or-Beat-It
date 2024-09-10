const router = require('express').Router();
const { addRecipe, getRecipes, getSingleRecipe, generalRecipes, commentsOnRecipes } = require('../../controllers/recipe-controller');
const { getComments, getSingleComment, addComment  } = require('../../controllers/comment-controllers');
const { addSavedRecipe } = require('../../controllers/user-controller')


// router.route('/').post(async (req, res) => {
//     try {
//       const recipeData = req.body;
//       await saveRecipeToDatabase(recipeData);
//       res.status(201).json({ message: 'Recipe saved successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error saving recipe', error: error.message });
//     }
//   });



//add a recipe to saved list route will be /
router.route('/').get(getRecipes);

router.route('/:recipeId/').post(addComment).get(commentsOnRecipes);
router.route('/users/:userId/addSavedRecipe').post(addSavedRecipe);


module.exports = router;
