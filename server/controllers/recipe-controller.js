const Recipe = require("../models/Recipe");
const User = require("../models/User");

// Get all recipes for a given user
const getRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("recipes");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Get the titles and system IDs of all recipes the user owns
    const recipes = user.recipes.map((recipe) => ({
      recipeId: recipe._id, // Returning the recipe's unique ID
      title: recipe.recipe_name, // Returning the recipe's title (recipe_name)
    }));
    // Respond with the array of recipes
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get recipes" });
  }
};
const commentsOnRecipes = async (req,res) => {
  try {
    const comment = await Recipe.find({_id: req.params._id}).populate('Comment');
    res.json(comment);
  } catch (err) {
    console.log(err)
  }
}

const generalRecipes = async (req,res) => {
try{
  const recipe = await Comment.find({});
  res.json(recipe)
}catch(err){
  console.log(err)
}
}

// Get a single recipe for a given user
const getSingleRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    const user = await User.findById(userId).populate("recipes");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the specific recipe from the user's recipes array
    const recipe = user.recipes.find((r) => r.recipe_id === recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Add a recipe and tie it to the user
const addRecipe = async (req, res) => {
  try {
    const { userId } = req.params;
    const newRecipeData = req.body; // Assuming the recipe data is in the body

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the new recipe
    const newRecipe = await Recipe.create(newRecipeData);

    // Add the recipe to the user's recipes array
    user.recipes.push(newRecipe._id);
    await user.save();

    res.status(201).json({ message: "Recipe added", recipe: newRecipe });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ---------------- EXTERNAL API CALL -------------------- //
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

// Our API keys
const consumer_key = 'd63563bb75c641f783ada0171b5eb024';
const consumer_secret = '322b9d574ed14573b656c85bf1234c32';

// This is the OAuth instance. It gets the oauth_params needed below.
const oauth = OAuth({
    consumer: { key: consumer_key, secret: consumer_secret },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        console.log("Base String: ", base_string);
        console.log("Key: ", key);
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

// Export these two functions to also be used in the server route


// -----Get Recipe By id from API- SYSTEM WILL USE TO GET BETTER RECIPE DATA UPON SAVE---
async function getMoreRecipeDetails(recipe_id) {
  const request_data = {
      url: 'https://platform.fatsecret.com/rest/server.api',
      method: 'GET',
      data: {
          method: 'recipe.get.v2',
          recipe_id: recipe_id, // Recipe ID passed as a parameter
          format: 'json',
      },
  };

  // Add OAuth parameters manually to the request body
  const oauth_params = oauth.authorize(request_data);
  const query_params = new URLSearchParams({
      ...request_data.data,
      oauth_consumer_key: consumer_key,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: oauth_params.oauth_timestamp,
      oauth_nonce: oauth_params.oauth_nonce,
      oauth_version: '1.0',
      oauth_signature: oauth_params.oauth_signature
  });
  try {
    // Make the API request using fetch
    const response = await fetch(`${request_data.url}?${query_params.toString()}`, {
      method: request_data.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching recipe details: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Return the data to be used by the calling function
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Failed to fetch the recipe details');
  }
}


async function searchRecipes(searchParams) {
    console.log('Executing searchRecipes with:', searchParams);
    // Create the request_data object dynamically based on searchParams
    const request_data = {
        url: 'https://platform.fatsecret.com/rest/server.api',
        method: 'POST',
        data: {
            method: 'recipes.search.v3',
            format: 'json',
            max_results: searchParams.max_results || '',
            search_expression: searchParams.search_expression || '',
            recipe_types: searchParams.recipe_types || '',
            recipe_types_matchall: searchParams.recipe_types_matchall || '',
            must_have_images: searchParams.must_have_images || '',
            'calories.from': searchParams['calories.from'] || '',
            'calories.to': searchParams['calories.to'] || '',
            'carb_percentage.from': searchParams['carb_percentage.from'] || '',
            'carb_percentage.to': searchParams['carb_percentage.to'] || '',
            'protein_percentage.from': searchParams['protein_percentage.from'] || '',
            'protein_percentage.to': searchParams['protein_percentage.to'] || '',
            'fat_percentage.from': searchParams['fat_percentage.from'] || '',
            'fat_percentage.to': searchParams['fat_percentage.to'] || '',
            'prep_time.from': searchParams['prep_time.from'] || '',
            'prep_time.to': searchParams['prep_time.to'] || '',
        }
    };

    // Add OAuth parameters manually to the request body
    const oauth_params = oauth.authorize(request_data);
    request_data.data = {
        ...request_data.data,
        oauth_consumer_key: consumer_key,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: oauth_params.oauth_timestamp,
        oauth_nonce: oauth_params.oauth_nonce,
        oauth_version: '1.0',
        oauth_signature: oauth_params.oauth_signature
    };

    // Fetch the recipe search results
    try {
        const response = await fetch(request_data.url, {
            method: request_data.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(request_data.data).toString()
        });
        const data = await response.json();
        console.log('Recipes:', JSON.stringify(data, null, 2));
        return data.recipes.recipe; // Return the recipe search result array
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch the recipes');
    }
}




module.exports = {
  searchRecipes,
  getMoreRecipeDetails,//these two are for the external API
  getRecipes,
  getSingleRecipe,
  addRecipe,
  generalRecipes,
  commentsOnRecipes
};

