import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

// Define keys
const consumer_key = 'd63563bb75c641f783ada0171b5eb024';
const consumer_secret = '322b9d574ed14573b656c85bf1234c32';

// oAuthHeader function from the repo
function oAuthHeader(url, method, session, token) {
  if (!session || !token) {
    throw new Error('Trying to generate OAuth headers without valid access token or session.');
  }

  let oauthObject = new OAuth({
    consumer: {
      key: session,
      secret: token
    },
    signature_method: 'HMAC-SHA1',
    // nonce_length: 6,
    version: '1.0',
    hash_function: function(base_string, key) {
      return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    }
  });

  const oauthHeaders = oauthObject.toHeader(oauthObject.authorize({ url: url, method: method }));

  // Add the signature method explicitly if missing
  oauthHeaders.Authorization += ', oauth_signature_method="HMAC-SHA1"';
  
  return oauthHeaders;
}

// Set API Base URL
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://platform.fatsecret.com'
    : 'https://localhost:3001/api';

// Function to fetch search results
export const fetchSearchResults = async (searchParams) => {
  const url = `${API_BASE_URL}/rest/server.api`;
  const method = 'POST';

  const request_data = {
    method: 'recipes.search.v3',
    format: 'json',
    max_results: 50,
    search_expression: searchParams.search_expression,
    recipe_types: searchParams.recipe_types || '',
    recipe_types_matchall: 'false',
    must_have_images: 'true',
    'calories.from': searchParams['calories.from'] || '',
    'calories.to': searchParams['calories.to'] || '',
    'carb_percentage.from': searchParams['carb_percentage.from'] || '',
    'carb_percentage.to': searchParams['carb_percentage.to'] || '',
    'protein_percentage.from': searchParams['protein_percentage.from'] || '',
    'protein_percentage.to': searchParams['protein_percentage.to'] || '',
    'fat_percentage.from': searchParams['fat_percentage.from'] || '',
    'fat_percentage.to': searchParams['fat_percentage.to'] || '',
    'prep_time.from': searchParams['prep_time.from'] || '',
    'prep_time.to': searchParams['prep_time.to'] || ''
  };

  const oauthHeaders = oAuthHeader(url, method, consumer_key, consumer_secret);

  // Perform the fetch request
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        ...oauthHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(request_data).toString()
    });

    const responseBody = await response.text(); // Use text() to see the raw response

    if (!response.ok) {
      console.error('Response status:', response.status);
      console.error('Response body:', responseBody);
      throw new Error('Failed to fetch recipes');
    }

    const data = JSON.parse(responseBody); // Parse the response manually
    console.log(data);
    return data.recipes || [];
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};
