import React from "react";
import { useLocation } from "react-router-dom";
import EatItOrBeatIt from '../components/EatItOrBeatIt.jsx';

export default function SearchResults(recipeSearchResults) {
  const location = useLocation();
  const { results } = location.state || {};

  return (
    <div>
      {results ? (
        // <EatItOrBeatIt />
        <EatItOrBeatIt userId={currentUserId} recipes={recipeSearchResults} />
      ) : (
        <p>No search results available.</p>
      )}
    </div>
  );
};