import { useState, useEffect } from 'react';
import React from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
// import Recipe from "../../../server/models/Recipe";
// import User from "../../../server/models/User";
import { useUserContext } from '../providers/UserProvider';
import Comment from '../components/Comment';

export default function RecipeList(props) {

const {recipes} = props
console.log(recipes)
const [showModal, setShowModal] = useState(false)
const [selectedRecipe, setSelectedRecipe] = useState()

//modal logic
//modal logic
const handleShow = (recipe) => {
  setSelectedRecipe(recipe);
  setShowModal(true);
};

const handleClose = () => {
  setShowModal(false);
  setSelectedRecipe();
};


  return (
    <>
      <Container>
        <Row>
          {recipes.length && recipes.map(recipe => (
              <Col md="4" key={recipe.recipeId}>
                <Card border='dark' onClick={() => handleShow(recipe)}>
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              ))}
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleClose} id="savedRecipeModal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe?.recipe_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{selectedRecipe?.recipe_name}</h2>
          <img className="modalImg"
            src={selectedRecipe?.recipe_image}
            alt={selectedRecipe?.recipe_name}
            style={{ width: "90%" }}
          />
          <h3>Types:</h3>
          <p className="types">{selectedRecipe?.recipe_types.join(", ")}</p>
          <h3>Description:</h3>
          <p className="description">{selectedRecipe?.recipe_description}</p>
          <h3>Ingredients:</h3>
          {selectedRecipe?.recipe_ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient">
              <p>Name: {ingredient.food_name}</p>
              <p>Description: {ingredient.ingredient_description}</p>
              <p>Measurement: {ingredient.measurement_description}</p>
            </div>
          ))}
          <h3>Nutrition Information per Serving:</h3>
          {selectedRecipe?.serving_sizes?.serving && (
            <div className="nutrition">
              {Object.entries(selectedRecipe.serving_sizes.serving).map(
                ([key, value]) => (
                  <p key={key}>
                    {key.replace(/_/g, " ")}: {value}
                  </p>
                )
              )}
            </div>
          )}
          <h3>Directions:</h3>
          {selectedRecipe?.directions.map((direction, index) => (
            <div key={index} className="direction">
              <p>
                Step {direction.direction_number}:{" "}
                {direction.direction_description}
              </p>
            </div>
          ))}
          <h3>Additional Details:</h3>
          <p>Cooking Time: {selectedRecipe?.cooking_time_min} minutes</p>
          <p>Number of Servings: {selectedRecipe?.number_of_servings}</p>
          <p>Grams per Portion: {selectedRecipe?.grams_per_portion}</p>
          {/* <p>Rating: {selectedRecipe?.rating}</p> */}
          <Comment recipeId={selectedRecipe?.recipeId} />
        </Modal.Body>

      </Modal>
    </>


  );
}