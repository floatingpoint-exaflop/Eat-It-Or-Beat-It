import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';

export default function EatItOrBeatIt(props) {
  const { results } = props
  const [recipes, setRecipes] = useState(results); // Ensure results have a default value of an empty array
  const [currentRecipe, setCurrentRecipe] = useState(null);

  // Function to pick a random recipe
  const getRandomRecipe = () => {
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setCurrentRecipe(recipes[randomIndex]);
    }
  };

  // Function to handle "Beat It" button click
  const handleBeatIt = () => {
    const updatedRecipes = recipes.filter(recipe => recipe.recipe_id !== currentRecipe.recipe_id);
    setRecipes(updatedRecipes);
    if (updatedRecipes.length > 0) {
      getRandomRecipe();
    } else {
      setCurrentRecipe(null); // No more recipes left
    }
  };

  // Load a random recipe on first load of page
  useEffect(() => {
    if (recipes.length > 0) {
      getRandomRecipe();
    }
  }, [recipes]);

  // If no current recipe, return a message
  if (!currentRecipe) {
    return <div>No more recipes to display.</div>;
  }

  return (
    <Card>
      <Card.Img variant="top" src={currentRecipe.recipe_image} alt={currentRecipe.recipe_name} />
      <Card.Body>
        <Card.Title>{currentRecipe.recipe_name}</Card.Title>
        <Card.Text>{currentRecipe.recipe_description}</Card.Text>
        <ul>
          {currentRecipe.recipe_ingredients.ingredient.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <div className="d-flex justify-content-between">
          <Button variant="danger" onClick={handleBeatIt}>Beat It</Button>
          <Button variant="success" onClick={() => console.log("Eat It clicked")}>Eat It</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
