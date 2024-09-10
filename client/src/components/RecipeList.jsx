import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
// import Recipe from "../../../server/models/Recipe";
// import User from "../../../server/models/User";
import UserProvider from '../providers/UserProvider';

export default function RecipeList() {
  const { user } = UserProvider();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [recipes, setRecipes] = useState([]);

  const submitComment = (recipeId) => {
    // Implement your logic to submit the comment
    console.log(`Comment for recipe ${recipeId}: ${comment}`);
  };

  const getRecipes = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}/recipes/${recipes._id}`, {
        method: 'GET' // Explicitly stating that this is a GET request
      });
      const data = await response.json(response);
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
};

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
        <Container fluid className="text-light bg-dark p-5">
          <h1>Results</h1>
        </Container>
      <Container>
        <Row>
          {recipes.map((recipe) => {
            return (
              <Col md="4" key={recipe.recipeId}>
                <Card border='dark'>
                  {recipe.recipe_image && <Card.Img src={recipe.recipe_image} alt={`The recipe image for... ${recipe.recipe_name}`} variant='top' />}
                  
                  <Card.Body>
                    <Card.Title>{recipe.recipe_name}</Card.Title>
                    <p className='ingredients'>Ingredients: {recipe.recipe_ingredients.ingredient.join(', ')}</p>
                    <Card.Text>
                      <p className="description">{recipe.recipe_description}</p>
                      <p className='nutrition'>Nutrition: Calories: {recipe.recipe_nutrition.calories}, Carbohydrates: {recipe.recipe_nutrition.carbohydrate}, Fat: {recipe.recipe_nutrition.fat}, Protein: {recipe.recipe_nutrition.protein}</p>
                      <p className="types">{recipe.recipe_types.recipe_type.join(', ')}</p>
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

                    <Button className='btn-block btn-danger' onClick={() => submitComment(recipe.recipeId)}>
                      Submit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}