import fetch from 'node-fetch';
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

// This will be fed into the node fetch call below. Aside from the few items which have hard-coded values, the rest of this needs to come from state on the form where a user first searches for their desired recipe specs.
const request_data = {
    url: 'https://platform.fatsecret.com/rest/server.api',
    method: 'POST',
    data: {
        method: 'recipes.search.v3',
        format: 'json',
        // page_number: 0, //this is an optional field that is prolly useless for us unless we need to grab the next 50 items...
        max_results: 50, //this is the max we can grab from one fetch but response will tell us if there were more
        search_expression: searchExpression, //This is the user keywords like chicken; can also do chicken, pork and it will find things with both meats in the same recipe.
        recipe_types: recipeTypes,
        recipe_types_matchall: 'true', //this is false by default, we can decide if we want to let them search for more than one recipe type at once anyway?
        must_have_images:'false', //this is false by default, we can decide if we want to force images or just take and display them if they're available?
        'calories.from': caloriesFrom, //lower kcal bound, int
        'calories.to': caloriesTo, //higher kcal bound, int
        'carb_percentage.from': carbPercentageFrom, //lower carb bound, int, % between 0 and 100
        'carb_percentage.to': carbPercentageTo, //higher carb bound, int, % between 0 and 100
        'protein_percentage.from': proteinPercentageFrom, //lower protein bound, int, % between 0 and 100
        'protein_percentage.to': proteinPercentageTo, //higher protein bound, int, % between 0 and 100
        'fat_percentage.from': fatPercentageFrom, //lower fat bound, int, % between 0 and 100
        'fat_percentage.to': fatPercentageTo, //higher fat bound, int, % between 0 and 100
        'prep_time.from': prepTimeFrom, //lower preptime bound, int, minutes
        'prep_time.to': prepTimeTo, //higher fat bound, int, minutes
        // sort_by: '', //this is an optional field that might be useless for us since we would pull a random one from the array.
    },
}
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
    console.log(JSON.stringify(data, null, 2)); // Pretty-print string with indentation (2 spaces). If we get a pretty-print error, it will be because we aren't handling the object correctly.
})
.catch(error => console.error('Error:', error));