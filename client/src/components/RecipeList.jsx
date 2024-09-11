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
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe?.recipe_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='ingredients'>
            Ingredients: {selectedRecipe?.recipe_ingredients}
          </p>
          <p className="description">{selectedRecipe?.recipe_description}</p>
          <p className='nutrition'>
            Nutrition: <br/>
            Calories: {selectedRecipe?.serving_sizes?.serving?.calories} <br/>
            Carbohydrates: {selectedRecipe?.serving_sizes?.serving?.carbohydrates} <br/>
            Fat: {selectedRecipe?.serving_sizes?.serving?.fat} <br/>
            Protein: {selectedRecipe?.serving_sizes?.serving?.protein}<br/>
          </p>
          <p className="types">{selectedRecipe?.recipe_types}</p>
          <Comment recipeId={selectedRecipe?.recipeId}/>
        </Modal.Body>
      </Modal>
    </>


  );
}