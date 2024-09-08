// import fetch from 'node-fetch';
// import OAuth from 'oauth-1.0a';
// import crypto from 'crypto';
const fetch = require('node-fetch');
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

// Export this function to be used in the server route
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
        console.log(data)
        return data.recipes.recipe; // Return the recipe search result array
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch the recipes');
    }
}

// Export the function
module.exports = 
    searchRecipes;
