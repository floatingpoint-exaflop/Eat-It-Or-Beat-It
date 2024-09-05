import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom'

import recipe_list from '../../../server/seeds/recipeData.json'

export default function Recipe (props){
    
    const history = useNavigate();

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    
    const submitComment = (recipeId) => {
        // Implement your logic to submit the comment
        console.log(`Comment for recipe ${recipeId}: ${comment}`);
    };
    
    const handleBeatIt = (recipeId) => {
        // Implement your logic to navigate to another page
        history.push('/another-page');
    };

    const handleEatIt = (recipeId) => {
        // Implement your logic to save the recipe
        console.log(`Recipe ${recipeId} saved with rating ${rating}`);
    
        // Make an API call to save the recipe to the user model
        // You can use fetch or an API library like Axios for this
        saveRecipeToUserModel(recipeId, rating);
    
        // Redirect the user to another page
        history.push('/another-recipe-page');
    };


  return (
    <>
        <div fluid className="text-light bg-dark p-5">
            <Container>
            <h1>Results</h1>
            </Container>
        </div>
        <Container>
            <h2 className='pt-5'>
            {props.recipes.length
                ? `Viewing ${props.recipes.length} saved ${props.recipes.length === 1 ? 'recipe' : 'recipes'}:`
                : 'You have no saved recipes!'}
            </h2>
            <Row>
            {props.recipes.map((recipe) => {
                return (
                <Col md="4">
                    <Card key={props.recipe_id} border='dark'>
                    {props.recipe_image ? <Card.Img src={props.recipe_image} alt={`The recipe image for... ${props.recipe_image}`} variant='top' /> : null}

                    <Button className='btn-block btn-danger' onClick={() => handleEatIt(props.recipe_id)}>
                    Eat It!
                    </Button>
                    <Button className='btn-block btn-danger' onClick={() => handleBeatIt(props.recipe_id)}>
                    Beat It!
                    </Button>

                    <Card.Body>
                        <Card.Title>{props.recipe_name}</Card.Title>
                        <p className='ingredients'>Ingredients: {props.recipe_ingredients}</p>
                            <Card.Text>
                            <p className="description">{props.recipe_description}</p>    
                            <p className='nutrition'>Nutrition: {props.recipe_nutrition}</p>
                            <p className="types">{props.recipe_type}</p>
                            </Card.Text>
                        
                        <Card.Textarea>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add your comment here"
                             />
                        </Card.Textarea>

                        <Card.Ratings>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                                >
                                    ★
                                </span>
                            ))}
                        </Card.Ratings>

                        <Button className='btn-block btn-danger' onClick={() => submitComment(props.recipe_id)}>
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
};

