import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

const consumer_key = "d63563bb75c641f783ada0171b5eb024";
const consumer_secret = "322b9d574ed14573b656c85bf1234c32";

const oauth = OAuth({
  consumer: { key: consumer_key, secret: consumer_secret },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  },
});

const getOAuthParams = (request_data) => {
  const oauth_params = oauth.authorize(request_data);
  return {
    oauth_consumer_key: consumer_key,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: oauth_params.oauth_timestamp,
    oauth_nonce: oauth_params.oauth_nonce,
    oauth_version: "1.0",
    oauth_signature: oauth_params.oauth_signature,
  };
};

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://platform.fatsecret.com" // Production URL
    : "https://localhost:3001/api"; // Development URL (with proxy in server.js)

export const fetchSearchResults = async (searchParams) => {
  const request_data = {
    url: `${API_BASE_URL}/rest/server.api`, // Use the dynamic base URL
    // url: 'https://platform.fatsecret.com/rest/server.api', //Reference: actual full api URL endpoint
    method: "POST",
    data: {
      method: "recipes.search.v3",
      format: "json",
      max_results: 50,
      search_expression: searchParams.search_expression,
      recipe_types: searchParams.recipe_types || "",
      recipe_types_matchall: "false",
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

  const oauthParams = getOAuthParams(request_data);

  const formBody = new URLSearchParams({
    ...request_data.data,
    ...oauthParams,
  });

  const response = await fetch(request_data.url, {
    method: "POST",
    body: formBody,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log("Response status:", response.status, response.statusText);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await response.json();
  console.log("Data received:", data);

  return data.recipes || [];
};
