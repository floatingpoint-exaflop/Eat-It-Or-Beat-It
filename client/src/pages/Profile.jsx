import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fred from '../icons/images/fred.png';

export default function Profile(props) {
    const [comments, setComments] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    // Fetch user comments from MongoDB
    async function getUserComments() {
        try {
            const response = await fetch(`/api/comments/${props.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                console.error('Error fetching comments:', data.message);
            } else {
                setComments(data); // Ensure data is an array of comments
            }
        } catch (err) {
            console.log('Error fetching comments:', err);
        }
    }

    // Fetch user saved recipes
    async function getSavedRecipes() {
        try {
            const response = await fetch(`/api/${props.userId}/savedrecipes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                console.error('Error fetching recipes:', data.message);
            } else {
                setSavedRecipes(data); // Ensure data is an array of saved recipes
            }
        } catch (err) {
            console.log('Error fetching recipes:', err);
        }
    }

    useEffect(() => {
        // Fetch comments and saved recipes when the component mounts
        getUserComments();
        getSavedRecipes();
    }, [props.userId]);

    return (
        <div className='container col-12 mt-5'>
            <div className="row" id="userBody">
                <div className="row" style={{ width: "100%" }} id="userHeader">
                    <div className="col-lg-3 col-md-3 col-sm-0" id="userAvatar">
                        <img className="img-thumbnail" src={fred} alt="User Avatar" />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12" id="userDetails">
                        <h3 className="col-12" id="username">Username: {props.username}</h3>
                        <h5 className="col-12" id="email">{props.email}</h5>
                    </div>
                </div>
                    <div className="col-5 p-3" style={{ border: '2px solid yellow' }} id="commentsContainer">
                        <h2>Recipes I have commented on:</h2>
                        {comments.length === 0 ? (
                            <div id='noArrayComments'>
                                <p>No comments available.</p>
                                <button type='click'>Show me the recipes most commented on!</button>
                            </div>
                        ) : (
                            comments.map(comment => (
                                <div key={comment._id}>
                                    <Link to={`/recipe/${comment.apiRecipeId._id}`}>
                                        {comment.apiRecipeId.name}
                                    </Link>
                                    <p>{comment.commentBody}</p>
                                </div>
                    </div>
                <div className="col-12 row mt-5" id="fetchContainer">
                    {/* Saved Recipes Section */}
                    <div className="col-5 p-3 mr-3" style={{ border: '1px solid black', backgroundColor: "white", color: "black" }} id="savedRecipes">
                        <h2>Recipes marked "eat it"</h2>
                        {savedRecipes.length === 0 ? (
                            <div id='noArrayRecipe'>
                                <p style={{color: "black"}}>No saved recipes available.</p>
                                <button type="button" style={{color: "black"}}>Take me to some recipes!</button>
                            </div>
                        ) : (
                            savedRecipes.map(item => (
                                <div key={item.id}>
                                    <h4>{item.title}</h4>
                                    <p>{item.prep_time}</p>
                                    <img src={item.img} alt={item.title} />
                                </div>
                            ))
                        )}
                    </div>

                    {/* Comments Section */}
                    <div className="col-5 p-3" style={{ border: '1px solid black', backgroundColor: "white", color: "black" }} id="commentsContainer">
                        <h2>Recipes I have commented on:</h2>
                        {comments.length === 0 ? (
                            <div id='noArrayComments'>
                                <p style={{color: "black"}}>No comments available.</p>
                                <button type='button' style={{color: "black"}}>Show me the recipes most commented on!</button>
                            </div>
                        ) : (
                            comments.map(comment => (
                                <div key={comment._id}>
                                    <Link to={`/recipe/${comment.apiRecipeId._id}`}>
                                        {comment.apiRecipeId.name}
                                    </Link>
                                    <p>{comment.commentBody}</p>
                <div className="row mt-5" id="fetchContainer">
                    <div className="col-11 mr-3" style={{ border: '2px solid yellow' }} id="preferencesForm">
                        <form id="userPref">
                            <label htmlFor="whyHere">How can we help?</label>
                            <select id="whyHere" name="whyHere" multiple>
                                <option value="newRecipe">Find new recipes</option>
                                <option value="macros">Find macronutrient specific meals</option>
                            </select>
                            <label htmlFor="dietRestrictions">Dietary restrictions</label>
                            <select id="dietRestrictions" name="dietRestrictions" multiple>
                                <option value="lowSugar">Low sugar</option>
                                <option value="lowCarb">Low carb</option>
                                <option value="highProtein">High protein</option>
                                <option value="peanutAllergy">Peanut allery</option>
                                <option value="dairyAllergy">Dairy allergy</option>
                            </select>
                            <label htmlFor="macroTrack">Are there any macronutrients you're tracking?</label>
                            <select id="macroTrack" name="macroTrack" multiple>
                                <option value="carb">Carbohydrates</option>
                                <option value="protein">Proteins</option>
                                <option value="fat">Fat</option>
                            </select>
                        </form>
                    </div>
                    <div className='col-11 row' id="returnDataContainer">
                        <div className="col-5 p-3 mr-3" style={{ border: '2px solid yellow' }} id="savedRecipes">
                            <h5>Recipes marked "eat it"</h5>
                            {savedRecipes.length === 0 ? (
                                <div id='noArrayRecipe'>
                                <p>No saved recipes available.</p>
                                <button type="click">Take me to some recipes!</button> 
                                </div>
                            ) : (
                                savedRecipes.map(item => (
                                    <div key={item.id}>
                                        <h4>{item.title}</h4>
                                        <p>{item.prep_time}</p>
                                        <img src={item.img} alt={item.title} />
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="col-6 p-2" style={{ border: '2px solid yellow' }} id="commentsContainer">
                            <h5>Recipes commented on:</h5>
                            {comments.length === 0 ? (
                                <div id='noArrayComments'>
                                <p>No comments available.</p>
                                <button type='click'>Show me the recipes most commented on!</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
