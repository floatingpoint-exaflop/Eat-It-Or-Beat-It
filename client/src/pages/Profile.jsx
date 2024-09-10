import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import fred from '../icons/images/fred.png';
import {getComments, getSingleComment} from '../../../server/controllers/comment-controllers'
import {getRecipes} from '../../../server/controllers/recipe-controller'

export default function Profile(props) {
    function handleInputOnChange(event) {
        console.log(event.target.value);
        setFormField(event.target.value);
    }

    // Assuming savedRecipes and comments are fetched from your MongoDB
    const savedRecipes = []; // Replace with your actual data fetching logic
    const comments = []; // Replace with your actual data fetching logic

    return (
        <div className='container col-12 mt-5'>
            <div className="col-12 row" id="userBody">
                <div className="row" style={{ width: "100%" }} id="userHeader">
                    <div className="col-lg-3 col-md-3 col-sm-0" id="userAvatar">
                        <img className="img-thumbnail" src={fred} alt="User Avatar" />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12" id="userDetails">
                        <h3 className="col-12" id="username">Username: bambamsdad</h3>
                        <h5 className="col-12" id="fullName">Fred Flinstone</h5>
                        <h5 className="col-12" id="email">fredflinstone@gmail.com</h5>
                    </div>
                </div>
                <div className="col-12 row mt-5" id="fetchContainer">
                    <div className="col-4 mr-3" style={{ border: '1px solid black' }} id="preferencesForm">
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
                    <div className='col-8 row' id="returnDataContainer">
                        <div className="col-5 p-3 mr-3" style={{ border: '1px solid black' }} id="savedRecipes">
                            <h2>Recipes marked "eat it"</h2>
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
                        <div className="col-5 p-2" style={{ border: '1px solid black' }} id="commentsContainer">
                            <h2>Recipes I have commented on:</h2>
                            {comments.length === 0 ? (
                                <div id='noArrayComments'>
                                <p>No comments available.</p>
                                <button type='click'>Show me the recipes most commented on!</button>
                                </div>
                            ) : (
                                comments.map(comment => (
                                    <div key={comment.commentid}>
                                        <Link to={`/recipe/${comment.apiRecipeId.id}`}>{comment.apiRecipeId.name}</Link>
                                        <p>{comment.commentBody}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}