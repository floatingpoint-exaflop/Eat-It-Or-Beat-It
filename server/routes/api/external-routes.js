const router = require('express').Router();
const { searchRecipes, getMoreRecipeDetails } = require('../../controllers/recipe-controller');

//This post route actually is used to get recipes from fatsecret based on the search form's criteria given by user in UI; don't ask me why they made it a post request but it works
router.route('/search').post(async (req, res) => {
    const searchParams = req.body;
    try {
      const searchResults = await searchRecipes(searchParams);
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  });

//This get route is used to get more detailed information on a given recipe (as defined by Fatsecret's ID, not any ID we're giving it in the DB; understanding this is crucial).
//We call it when the user hits Eat It, so we have better data on hand to send into the DB as a row for the user's recipe list. The object returned from here - not frtom the post route above - is what we save as a recipe for a user.
router.route('/search/:recipeId').get(async (req, res) => {
  const { recipeId } = req.params; // Extract recipeId from route parameters
  console.log('Received recipeId:', recipeId);

  try {
    const searchResults = await getMoreRecipeDetails(recipeId); // Call external API with the recipeId
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});


module.exports = router;