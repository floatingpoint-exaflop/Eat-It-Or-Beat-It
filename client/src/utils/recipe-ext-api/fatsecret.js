import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import jsSHA from "jssha";

// Define keys
const consumer_key = "d63563bb75c641f783ada0171b5eb024";
const consumer_secret = "322b9d574ed14573b656c85bf1234c32";

// Set up OAuth instance
// const oauth = OAuth({
//   consumer: { key: consumer_key, secret: consumer_secret },
//   signature_method: 'HMAC-SHA1',
//   hash_function(base_string, key) {
//     // Use CryptoJS for HMAC-SHA1 hashing and Base64 encoding
//     return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
//   }
// });

const hash_function = (base_string, key) => {
  console.log("Base String Before Encoding: ", base_string);
  console.log("Key Before Encoding: ", key);
  const shaObj = new jsSHA("SHA-1", "TEXT");
  shaObj.setHMACKey(key, "TEXT");
  shaObj.update(base_string);
  const signature = shaObj.getHMAC("B64");
  console.log("Computed Signature (Base64): ", signature);
  return signature;
};
// Initialize OAuth 1.0a
const oauth = new OAuth({
  consumer: { key: consumer_key, secret: consumer_secret },
  signature_method: "HMAC-SHA1",
  hash_function, // Pass the custom hash function
});

// Helper function to get OAuth params and signature
const getOAuthParams = (request_data) => {
  // Generate OAuth parameters
  const oauth_params = oauth.authorize(request_data);

  // URL-encode the OAuth signature
  const encodedSignature = encodeURIComponent(oauth_params.oauth_signature);

  // Log for debugging
  console.log("OAuth Signature (Raw): ", oauth_params.oauth_signature);
  console.log("URL-encoded OAuth Signature: ", encodedSignature);

  return {
    oauth_consumer_key: consumer_key,
    oauth_nonce: oauth_params.oauth_nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: oauth_params.oauth_timestamp,
    oauth_version: "1.0",
    oauth_signature: encodedSignature, // Ensure the signature is URL-encoded
  };
};

// Set API Base URL
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://platform.fatsecret.com"
    : "http://localhost:3001/api";

// Function to fetch search results
export const fetchSearchResults = async (searchParams) => {
  const actualFatSecretURL = "https://platform.fatsecret.com/rest/server.api";

  // Set up request data for OAuth (using actualFatSecretURL for signature)
  const request_data = {
    url: actualFatSecretURL,
    method: "POST",
    data: {
      method: "recipes.search.v3",
      format: "json",
      max_results: 1,
      search_expression: searchParams.search_expression,
      recipe_types: searchParams.recipe_types || "",
      recipe_types_matchall: "true",
      must_have_images: "true",
      "calories.from": searchParams["calories.from"] || "",
      "calories.to": searchParams["calories.to"] || "",
      "carb_percentage.from": searchParams["carb_percentage.from"] || "",
      "carb_percentage.to": searchParams["carb_percentage.to"] || "",
      "protein_percentage.from": searchParams["protein_percentage.from"] || "",
      "protein_percentage.to": searchParams["protein_percentage.to"] || "",
      "fat_percentage.from": searchParams["fat_percentage.from"] || "",
      "fat_percentage.to": searchParams["fat_percentage.to"] || "",
      "prep_time.from": searchParams["prep_time.from"] || "",
      "prep_time.to": searchParams["prep_time.to"] || "",
    },
  };

  // Generate OAuth parameters
  const oauthParams = getOAuthParams(request_data);

  // Combine OAuth parameters with request data
  const fullParams = {
    ...request_data.data,
    ...oauthParams,
  };

  // Convert parameters to URL-encoded form
  const formBody = new URLSearchParams(fullParams);

  // Log for debugging
  console.log("Request Body: ", formBody.toString());

  const API_BASE_URL = "http://localhost:3001/api";
  const response = await fetch(`${API_BASE_URL}/rest/server.api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.toString(), // body includes the OAuth signature and other data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await response.json();
  console.log(data);
  return data.recipes || [];
};
