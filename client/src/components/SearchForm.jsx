import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import RecipeSearchSwipe from "../utils/ext-api-calls/recipe-ext-api/searchRecipesReact";

export default function SearchForm() {
  const [formSearchSpecs, setformSearchSpecs] = useState({
    method: "recipes.search.v3",
    format: "json",
    max_results: 50,
    search_expression: "",
    recipe_types: "",
    recipe_types_matchall: "false",
    must_have_images: "true",
    "calories.from": "",
    "calories.to": "",
    "carb_percentage.from": "",
    "carb_percentage.to": "",
    "protein_percentage.from": "",
    "protein_percentage.to": "",
    "fat_percentage.from": "",
    "fat_percentage.to": "",
    "prep_time.from": "",
    "prep_time.to": "",
  });
  const [SearchFormErrors, setSearchFormErrors] = useState({
    search_expression: "",
    recipe_types: "",
    "calories.from": "",
    "calories.to": "",
    "carb_percentage.from": "",
    "carb_percentage.to": "",
    "protein_percentage.from": "",
    "protein_percentage.to": "",
    "fat_percentage.from": "",
    "fat_percentage.to": "",
    "prep_time.from": "",
    "prep_time.to": "",
  });

  const handleSearchInputChange = (event) => {
    const { name, value } = event.target;
    setformSearchSpecs({
      ...formSearchSpecs,
      [name]: value,
    });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSearchResults(formSearchSpecs);
  };

  return (
    <form onSubmit={handleSearchSubmit}>

      <label htmlFor="search_expression">
        Enter any keywords for desired ingredients, separated by commas.
      </label>
      <input
        type="text"
        name="search_expression"
        placeholder="chicken"
        value={formSearchSpecs.search_expression}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="recipe-type">Choose a recipe type:</label>
      <select
        id="recipe-type"
        name="recipe_type"
        value={formSearchSpecs.recipe_types}
        onChange={handleSearchInputChange}
      >
        <option value="">--Please choose an option--</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Appetizer">Appetizer</option>
        <option value="Soup">Soup</option>
        <option value="Main Dish">Main Dish</option>
        <option value="Side Dish">Side Dish</option>
        <option value="Dessert">Dessert</option>
        <option value="Snack">Snack</option>
        <option value="Baked">Baked</option>
        <option value="Salad and Salad Dressing">
          Salad and Salad Dressing
        </option>
        <option value="Sauce and Condiment">Sauce and Condiment</option>
        <option value="Beverage">Beverage</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="calories.from">Minimum Calories</label>
      <input
        type="number"
        name="calories.from"
        placeholder="0"
        value={formSearchSpecs["calories.from"]}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="calories.to">Maximum Calories</label>
      <input
        type="number"
        name="calories.to"
        placeholder="2000"
        value={formSearchSpecs["calories.to"]}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="carb_percentage.from">Minimum Carb Percentage</label>
      <input
        type="number"
        name="carb_percentage.from"
        placeholder="0"
        value={formSearchSpecs["carb_percentage.from"]}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="carb_percentage.to">Maximum Carb Percentage</label>
      <input
        type="number"
        name="carb_percentage.to"
        placeholder="100"
        value={formSearchSpecs["carb_percentage.to"]}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="protein_percentage.from">
        Minimum Protein Percentage
      </label>
      <input
        type="number"
        name="protein_percentage.from"
        placeholder="0"
        value={formSearchSpecs["protein_percentage.from"]}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="protein_percentage.to">Maximum Protein Percentage</label>
      <input
        type="number"
        name="protein_percentage.to"
        placeholder="100"
        value={formSearchSpecs["protein_percentage.to"]}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="fat_percentage.from">Minimum Fat Percentage</label>
      <input
        type="number"
        name="fat_percentage.from"
        placeholder="0"
        value={formSearchSpecs["fat_percentage.from"]}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="fat_percentage.to">Maximum Fat Percentage</label>
      <input
        type="number"
        name="fat_percentage.to"
        placeholder="100"
        value={formSearchSpecs["fat_percentage.to"]}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="prep_time.from">Minimum Prep Time, minutes</label>
      <input
        type="number"
        name="prep_time.from"
        placeholder="0"
        value={formSearchSpecs["prep_time.from"]}
        onChange={handleSearchInputChange}
      />

      <label htmlFor="prep_time.to">Maximum Prep Time, minutes</label>
      <input
        type="number"
        name="prep_time.to"
        placeholder="1000"
        value={formSearchSpecs["prep_time.to"]}
        onChange={handleSearchInputChange}
      />

      <button type="submit">I'm hungry!</button>
    </form>
  );
}
