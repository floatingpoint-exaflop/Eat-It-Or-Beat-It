// import fetch from 'node-fetch';
import OAuth from 'oauth-1.0a';
// import crypto from 'crypto';
import CryptoJS from 'crypto-js';
import { useState, useEffect } from 'react';

const consumer_key = 'd63563bb75c641f783ada0171b5eb024';
const consumer_secret = '322b9d574ed14573b656c85bf1234c32';
const oauth = OAuth({
    consumer: { key: consumer_key, secret: consumer_secret },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    }
});

const getOAuthParams = (request_data) => {
    const oauth_params = oauth.authorize(request_data);
    return {
        oauth_consumer_key: consumer_key,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: oauth_params.oauth_timestamp,
        oauth_nonce: oauth_params.oauth_nonce,
        oauth_version: '1.0',
        oauth_signature: oauth_params.oauth_signature,
    };
};

//----------------------------------------------------------------------

export default function RecipeSearchSwipe() {
    const [formSearchSpecs, setformSearchSpecs] = useState(null);
    const [recipeSearchResults, setRecipeSearchResults] = useState([]);
    const [currentEatOrBeat, setcurrentEatOrBeat] = useState(null);
    const [error, setError] = useState(null);

    const fetchSearchResults = async (searchParams) => {
        // Define request_data using searchParams from form
        const request_data = {
            url: 'https://platform.fatsecret.com/rest/server.api',
            method: 'POST',
            data: {
                method: 'recipes.search.v3',
                format: 'json',
                max_results: 50,
                search_expression: searchParams.search_expression,
                recipe_types: searchParams.recipe_types || '',
                recipe_types_matchall: 'false',
                must_have_images: 'true',
                'calories.from': searchParams.calories?.from || '',
                'calories.to': searchParams.calories?.to || '',
                'carb_percentage.from': searchParams.carb_percentage?.from || '',
                'carb_percentage.to': searchParams.carb_percentage?.to || '',
                'protein_percentage.from': searchParams.protein_percentage?.from || '',
                'protein_percentage.to': searchParams.protein_percentage?.to || '',
                'fat_percentage.from': searchParams.fat_percentage?.from || '',
                'fat_percentage.to': searchParams.fat_percentage?.to || '',
                'prep_time.from': searchParams.prep_time?.from || '',
                'prep_time.to': searchParams.prep_time?.to || '',
            },
        };

        // Add OAuth params
        request_data.data = {
            ...request_data.data,
            ...getOAuthParams(request_data),
        };

        // Make API request
        fetch(request_data.url, {
            method: request_data.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(request_data.data).toString(),
        })
        .then(response => response.json())
        .then(data => {
            setRecipeSearchResults(data.recipes.recipe);
            console.log("Recipe search results have been pulled from the FatSecret external restAPI, and are set/stored in state as recipeSearchResults.");
        })
        .catch(error => console.error('Error:', error));
    };

    function getRandomRecipe() {
        if (recipeSearchResults.length === 0) {
            console.error('No recipes available. Did you fetch first or was this just a dud search?');
            return null;
        }
        const randomIndex = Math.floor(Math.random() * recipeSearchResults.length);
        return recipeSearchResults[randomIndex];
    }

    const handleGetRandomRecipe = () => {
        const randomRecipe = getRandomRecipe();
        if (randomRecipe) {
            setcurrentEatOrBeat(randomRecipe);
            console.log("Randomly selected recipe:", randomRecipe);
        }
    };

    return (
        console.log("oink")
    );
}