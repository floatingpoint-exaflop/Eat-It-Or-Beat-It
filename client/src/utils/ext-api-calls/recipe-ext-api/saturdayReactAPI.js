import fetch from 'node-fetch';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import {useState, useEffect} from 'react'

const consumer_key = 'd63563bb75c641f783ada0171b5eb024';
const consumer_secret = '322b9d574ed14573b656c85bf1234c32';
const oauth = OAuth({
    consumer: { key: consumer_key, secret: consumer_secret },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});
const request_data = {
    url: 'https://platform.fatsecret.com/rest/server.api',
    method: 'POST',
    data: {
        method: 'recipes.search.v3',
        format: 'json',
        // page_number: 0,
        max_results: 50,
        search_expression: searchExpression,
        recipe_types: recipeTypes,
        recipe_types_matchall: 'false',
        must_have_images:'true',
        'calories.from': calories.from,
        'calories.to': calories.to,
        'carb_percentage.from': carb_percentage.from,
        'carb_percentage.to': carb_percentage.to,
        'protein_percentage.from': protein_percentage.from,
        'protein_percentage.to': protein_percentage.to,
        'fat_percentage.from': fat_percentage.from,
        'fat_percentage.to': fat_percentage.to,
        'prep_time.from': prep_time.from,
        'prep_time.to': prep_time.to,
        // sort_by: ''
    },
}
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

//----------------------------------------------------------------------

export default function RecipeSearchSwipe() {
    const [formSearchSpecs, setformSearchSpecs] = useState(null);
    const [recipeSearchResults, setRecipeSearchResults] = useState([]);
    const [currentEatOrBeat, setcurrentEatOrBeat] = useState(null);
    const [error, setError] = useState(null);

    const fetchSearchResults = async (searchParams) => {
        fetch(request_data.url, {
            method: request_data.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(request_data.data).toString()
        })
        .then(response => response.json())
        .then(data => {
            setRecipeSearchResults(data.recipes.recipe);
                console.log("Recipe search results have been pulled from the FatSecret external restAPI, and are set/stored in state as recipeSearchResults.")
        })
        .catch(error => console.error('Error:', error));
    }, []);

    function getRandomRecipe() {
        if (recipes.length === 0) {
            console.error('No recipes available. Did you fetch first or was this just a dud search?')
            return null;
        }
        const randomIndex = Math.floor(Math.random() * recipes.length);
        return recipes[randomIndex];
    }
    const handleGetRandomRecipe = () => {
        const randomRecipe = getRandomRecipe()
        if (randomRecipe) {
            console.log("Randomly selected recipe:", randomRecipe)
        }
    }
}

