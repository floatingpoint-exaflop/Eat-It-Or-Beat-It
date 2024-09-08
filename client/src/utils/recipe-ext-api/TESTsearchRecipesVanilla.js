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
        console.log("Base String: ", base_string);
        console.log("Key: ", key);
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

// This will be fed into the node fetch call below. Aside from the few items which have hard-coded values, the rest of this needs to come from state on the form where a user first searches for their desired recipe specs.
const request_data = {
    url: 'https://platform.fatsecret.com/rest/server.api',
    method: 'POST',
    data: {
        method: 'recipes.search.v3',
        format: 'json',
        max_results: 1,
        search_expression: 'chicken',
        recipe_types: 'lunch',
        recipe_types_matchall: 'false',
        must_have_images: 'true',
        'calories.from': '',
        'calories.to': 900,
        'carb_percentage.from': 0,
        'carb_percentage.to': 100,
        'protein_percentage.from': 0,
        'protein_percentage.to': 100,
        'fat_percentage.from': 0,
        'fat_percentage.to': 100,
        'prep_time.from': 0,
        'prep_time.to': 100,
    }
};

// Add OAuth parameters manually to the request body; why this had to be separately handled is a bit of a mystery to me.
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

//Finally, we can retrieve the array of recipes now.
fetch(request_data.url, {
    method: request_data.method,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(request_data.data).toString()
})
.then(response => response.json())
.then(data => {
    const searchResultArray = data.recipes.recipe;
    searchResultArray.forEach(recipe => {
        console.log(JSON.stringify(recipe, null, 2)); // Pretty-print each recipe object
        
    });
})
.catch(error => console.error('Error:', error));