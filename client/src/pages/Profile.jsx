import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'; // Make sure you have Bootstrap installed and imported
import fred from '../icons/images/fred.png';

import RecipeList from '../components/RecipeList';
import { useUserContext } from "../providers/UserProvider";
// import {getComments, getSingleComment} from '../../../server/controllers/comment-controllers'
// import {getRecipes} from '../../../server/controllers/recipe-controller'


export default function Profile(props) {
    const [comments, setComments] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const { userData, setUserData } = useUserContext();
    // Fetch user comments from MongoDB
    // async function getUserComments() {
    //     try {
    //         const response = await fetch(`/api/recipe/`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json",
    //             },
    //         });
    //         const data = await response.json();
    //         if (!response.ok) {
    //             console.error('Error fetching comments:', data.message);
    //         } else {
    //             setComments(data);
    //         }
    //     } catch (err) {
    //         console.log('Error fetching comments:', err);
    //     }
    // }
    //need a get user by ID

    // Fetch user saved recipes
    async function getSavedRecipes() {
        try {
            //assume props.userId is a placeholder. 
            console.log(userData)
            const response = await fetch(`/api/users/${userData.id}/savedrecipes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                console.error('Error fetching recipes:', data.message);
            } else {
                setSavedRecipes(data);
            }
        } catch (err) {
            console.log('Error fetching recipes:', err);
        }
    }


    useEffect(() => {
        // getUserComments();
        getSavedRecipes();
    }, [userData.id]);

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
            </div>
            

            {/* <div className="col-12 row text-center d-flex justify-content-center mt-5">
                {/* Saved Recipes Section */}
            <div className="col-12 p-3 mr-3" style={{ border: '2px solid yellow' }} id="savedRecipes">
                <h2>Recipes marked "eat it"</h2>
                {savedRecipes.length === 0 ? (
                    <div id='noArrayRecipe'>
                        <p>No saved recipes available.</p>
                        <Link to="/" className="btn btn-primary">Take me to the search page</Link>
                    </div>
                ) : (
                    <div>
                        <h2>Saved Recipes</h2>
                        <RecipeList recipes={savedRecipes} />
                    </div>
                )}
            </div>

            {/* Uncomment and complete Comments Section */}
            {/* 
                <div className="col-5 p-3" style={{ border: '2px solid yellow' }} id="commentsContainer">
                    <h2>Recipes I have commented on:</h2>
                    {comments.length === 0 ? (
                        <div id='noArrayComments'>
                            <p>You haven't commented on any recipes yet.</p>
                        </div>
                    ) : (
                        comments.map(comment => (
                            <div key={comment._id}>
                                <Link to={`/recipe/${comment.apiRecipeId._id}`}>
                                    {comment.apiRecipeId.name}
                                </Link>
                                <p>{comment.commentBody}</p>
                            </div>
                        ))
                    )}
                </div>
                */}
        </div>

    );
}

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import fred from '../icons/images/fred.png';

// export default function Profile(props) {
//     const [comments, setComments] = useState([]);
//     const [savedRecipes, setSavedRecipes] = useState([]);

//     const SavedRecipes = ({ savedRecipes }) => {
//         if (savedRecipes.length === 0) {
//             return <div>No saved recipes yet.</div>;
//         }

//         // Fetch user comments from MongoDB
//         async function getUserComments() {
//             try {
//                 const response = await fetch(`/api/comments/66e06e72786572a2c8148203`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Accept": "application/json",
//                     },
//                 });
//                 const data = await response.json();
//                 if (!response.ok) {
//                     console.error('Error fetching comments:', data.message);
//                 } else {
//                     setComments(data);
//                 }
//             } catch (err) {
//                 console.log('Error fetching comments:', err);
//             }
//         }

//         // Fetch user saved recipes
//         async function getSavedRecipes() {
//             try {
//                 const response = await fetch(`/api/users/66e06e72786572a2c8148203/savedrecipes`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Accept": "application/json",
//                     },
//                 });
//                 const data = await response.json();
//                 if (!response.ok) {
//                     console.error('Error fetching recipes:', data.message);
//                 } else {
//                     setSavedRecipes(data);
//                 }
//             } catch (err) {
//                 console.log('Error fetching recipes:', err);
//             }
//         }

//         useEffect(() => {
//             getUserComments();
//             getSavedRecipes();
//         }, [props.userId]);

//         return (
//             <div className='container col-12 mt-5'>
//                 <div className="row" id="userBody">
//                     <div className="row" style={{ width: "100%" }} id="userHeader">
//                         <div className="col-lg-3 col-md-3 col-sm-0" id="userAvatar">
//                             <img className="img-thumbnail" src={fred} alt="User Avatar" />
//                         </div>
//                         <div className="col-lg-9 col-md-9 col-sm-12" id="userDetails">
//                             <h3 className="col-12" id="username">Username: {props.username}</h3>
//                             <h5 className="col-12" id="email">{props.email}</h5>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-12 row text-center d-flex justify-content-center mt-5">
//                     {/* Saved Recipes Section */}
//                     <div className="col-12 p-3 mr-3" style={{ border: '2px solid yellow' }} id="savedRecipes">
//                         <h2>Recipes marked "eat it"</h2>
//                         {savedRecipes.length === 0 ? (
//                             <div id='noArrayRecipe'>
//                                 <p>No saved recipes available.</p>
//                                 <Link to="/" className="btn btn-primary">Take me to the search page</Link>
//                             </div>
//                         ) : (
//                             <div>
//                                 <h2>Saved Recipes</h2>
//                                 {savedRecipes.map((recipe, index) => (
//                                     <Card key={index} className="mb-2">
//                                         <Card.Img variant="top" src={recipe.recipe_image} alt={recipe.recipe_name} />
//                                         <Card.Body>
//                                             <Card.Title>{recipe.recipe_name}</Card.Title>
//                                             <Card.Text>{recipe.recipe_description}</Card.Text>
//                                         </Card.Body>
//                                     </Card>
//                                 ))}
//                             </div>
//                         );
//                         {/* Comments Section */}
//                         {/* <div className="col-5 p-3" style={{ border: '2px solid yellow' }} id="commentsContainer">
//                 <h2>Recipes I have commented on:</h2>
//                 {comments.length === 0 ? (
//                     <div id='noArrayComments'>
//                         <p>You haven't commented on any recipes...yet. We'd love to hear your thoughts. There is a section to add your comment at the bottom of each recipe</p>
//                     </div>
//                 ) : (
//                     comments.map(comment => (
//                         <div key={comment._id}>
//                             <Link to={`/recipe/${comment.apiRecipeId._id}`}>
//                                 {comment.apiRecipeId.name}
//                             </Link>
//                             <p>{comment.commentBody}</p>
//                         </div>
//                     ))
//                 )}
//             </div> */}
//                     </div>
//                 </div>
//                 );
// }
