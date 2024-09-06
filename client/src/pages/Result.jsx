import React from 'react';
import Recipe from '../components/Recipe';
import { Container } from 'react-bootstrap';
import recipe_list from '../../../server/seeds/recipeData.json'



export default function RecipePage (props){
  if (!Array.isArray(recipe_list.recipes)) {
    return <div>No recipes found</div>; // Handle the case where recipes are not an array
  }


  return (
    <>
      <Container>
      {recipe_list.recipes.map((recipe) => (
        <Recipe key={recipe.recipe_id} recipe={recipe} />
      ))}
      </Container>
    </>
  );
};

