import { useState, useEffect } from 'react';
import React from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
// import Recipe from "../../../server/models/Recipe";
// import User from "../../../server/models/User";
import { useUserContext } from '../providers/UserProvider';
import Comment from '../components/Comment';

export default function RecipeList() {
  const { userData } = useUserContext();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [recipes, setRecipes] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);


  const savedRecipes = [];

  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const getRecipes = async () => {
    try {
      const response = await fetch(`/api/${userData.recipe_id}/recipes`, {
        method: 'GET' // Explicitly stating that this is a GET request
      });
      const data = await response.json(response);
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
};
  const getSingleRecipe = async () => {
    try {
      const response = await fetch(`/api/${userData.user._id}/recipes/${userData.recipe_id}`, {
        method: 'GET' // Explicitly stating that this is a GET request
      });
      const data = await response.json(response);
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
};

  useEffect(() => {
    if( userData._id ){
      getRecipes();
      getSingleRecipe();
    }
  }, []);

  return (
    <>
        <Container fluid className="text-light">
        <h4><i>Saved Recipes</i> </h4>
      </Container>
      <Container>
        <Row>
          {savedRecipes.length === 0 ? (
            <div id='noArrayRecipe'>
              <p>No saved recipes available.</p>
              <Link className="btn btn-primary" to = "/">
                Take me to some recipes!
              </Link>
            </div>
          ) : (
            savedRecipes.map((recipe) => (
              <Col md="4" key={recipe.recipe_id}>
                <Card border='dark' onClick={() => handleShow(recipe)}>
                  <Card.Body>
                    <Card.Title>{recipe.recipe_name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Modal for displaying recipe details */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe?.recipe_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='ingredients'>Ingredients: {selectedRecipe?.recipe_ingredients.ingredient.join(', ')}</p>
          <p className="description">{selectedRecipe?.recipe_description}</p>
          <p className='nutrition'>Nutrition: Calories: {selectedRecipe?.recipe_nutrition.calories}, Carbohydrates: {selectedRecipe?.recipe_nutrition.carbohydrate}, Fat: {selectedRecipe?.recipe_nutrition.fat}, Protein: {selectedRecipe?.recipe_nutrition.protein}</p>
          <p className="types">{selectedRecipe?.recipe_types.recipe_type.join(', ')}</p>

          <Comment />
        </Modal.Body>
      </Modal> 
    </>
  );
}

             {/* <Container fluid className="text-light bg-dark p-5">
        <h5><i>Eat It</i> Recipes</h5>
        </Container>
      <Container>
        <Row>
          {recipes.map((recipe) => {
            return (
              <Col md="4" key={props.recipes.recipeId}>
                <Card border='dark'>
                  {recipes.recipe_image && <Card.Img src={recipes.recipe_image} alt={`The recipe image for... ${recipes.recipe_name}`} variant='top' />}
                  
                  <Card.Body>
                    <Card.Title>{recipes.recipe_name}</Card.Title>
                    <p className='ingredients'>Ingredients: {recipes.recipe_ingredients.ingredient.join(', ')}</p>
                    <Card.Text>
                      <p className="description">{recipes.recipe_description}</p>
                      <p className='nutrition'>Nutrition: Calories: {recipes.recipe_nutrition.calories}, Carbohydrates: {recipes.recipe_nutrition.carbohydrate}, Fat: {recipes.recipe_nutrition.fat}, Protein: {recipes.recipe_nutrition.protein}</p>
                      <p className="types">{recipes.recipe_types.recipe_type.join(', ')}</p>
                    </Card.Text>

                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your comment here"
                    />

                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                      >
                        ★
                      </span>
                    ))}

                    <Button className='btn-block btn-danger' onClick={() => submitComment(recipes.recipeId)}>
                      Submit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container> */}        