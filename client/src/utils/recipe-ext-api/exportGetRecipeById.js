// import fetch from 'node-fetch';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

// Our API keys
const consumer_key = 'd63563bb75c641f783ada0171b5eb024';
const consumer_secret = '322b9d574ed14573b656c85bf1234c32';

// This is the OAuth instance. It gets the oauth_params needed below.
const oauth = OAuth({
    consumer: { key: consumer_key, secret: consumer_secret },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

// Export this function to be used in the server route
async function getRecipe(recipe_id) {
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

    // Construct the URL with the query params
    const url_with_params = `${request_data.url}?${query_params.toString()}`;

    // Fetch the recipe
    try {
        const response = await fetch(url_with_params, {
            method: request_data.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data = await response.json();
        return data; // Return the data to be used by the calling function
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch the recipe');
    }
}

// Export the function
module.exports = {
    getRecipe
};
