import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import oldMan from '../icons/images/avatar.png'



export default function Profile(props) {

    function handleInputOnChange(event) {
        console.log(event.target.value)
        setFormField(event.target.value)
    }
    //need to bring in saved recipes from mongo
    //need to bring in comments from mongo

    return (
        <div className="" id="userBody">
            <div className="row" id="userHeader">
                <div className="col-lg-3 col-md-3 col-sm-0" id="userAvatar">
                    <img src={oldMan} />

                </div>
                <div className="col-lg-9 col-md-9 col-sm-12" id="userDetails">
                    <h3 className="col-12" id="username">Username: TESTUSERNAME</h3>
                    <h5 className="col-12" id="fullName">Fred Flinstone</h5>
                    <h5 className="col-12" id="email">fredflinstone@gmail.com</h5>
                </div>
            </div>
            <div className="col-12" id="fetchContainer">
                <div className="col-4" id="preferencesForm">
                    <form id="userPref">
                        <label for="whyHere">How can we help?</label>
                        <select id="whyHere" name="whyHere" multiple>
                            <option value="newRecipe">Find new recipes</option>
                            <option value="macros">Find macronutrient specific meals</option>
                        </select>
                        <label for="dietRestrictions">Dietary restrictions</label>
                        <select id="dietRestrictions" name="dietRestrictions" multiple>
                            <option value="">Low sugar</option>
                            <option value="">Low carb</option>
                            <option value="">High protein</option>
                            <option value="">Peanut allert</option>
                            <option value="">Dairy allergy</option>
                        </select>
                        <label for="macroTrack">Are there any macronutrients you're tracking?</label>
                        <select id="macroTrack" name="macroTrack" multiple>
                            <option value="carb">Carbohydrates</option>
                            <option value="protein">Proteins</option>
                            <option value="fat">Fat</option>
                        </select>
                    </form>

                </div>
                <div className="col-4" id="savedRecipes">
                    <h2>Recipes marked "eat it"</h2>
                    {savedRecipies.map(item => (
                        <div key={item.id}>
                            <h4>{item.title}</h4>
                            <p>{item.prep_time}</p>
                            <img>{item.img}</img>
                        </div>
                    ) )}

                </div>
                <div className="col-4" id="commentsContainer">
                    <h2>Recipes I have commented on:</h2>
                    {comments.map(comment => (
                        <div key={comment.commentid}>
                            <a href="/recipe/`{comment.apiRecipeId.id}`">{comment.apiRecipeId.name}</a>
                            <p>{comment.commentBody}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>



    )
}
