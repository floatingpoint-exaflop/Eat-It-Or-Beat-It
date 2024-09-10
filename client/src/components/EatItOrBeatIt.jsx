import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export default function EatItOrBeatIt(props) {
  const { results } = props;
  const [recipes, setRecipes] = useState(results); // Ensure results have a default value of an empty array
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [extraDetails, setExtraDetails] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]); // State for saved recipes

  // Function to pick a random recipe
  const getRandomRecipe = () => {
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setCurrentRecipe(recipes[randomIndex]);
    }
  };

  // Function to handle "Beat It" button click
  const handleBeatIt = () => {
    const updatedRecipes = recipes.filter(
      (recipe) => recipe.recipe_id !== currentRecipe.recipe_id
    );
    setRecipes(updatedRecipes);
    if (updatedRecipes.length > 0) {
      getRandomRecipe();
    } else {
      setCurrentRecipe(null); // No more recipes left
    }
  };

  async function handleEatIt() {
    console.log("Eat It clicked");
    try {
      const response = await fetch(
        `/api/recipe/search/${currentRecipe.recipe_id}`, // Ensure `recipe_id` is being accessed correctly
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch extra details.");
      }

      const data = await response.json();
      setExtraDetails(data); // Store results in state

      if (!data || Object.keys(data).length === 0) {
        setErrorMessage(
          "No more details found for this recipe. Did you send the ID correctly?"
        );
        setShowErrorModal(true);
      }
      
      // Save the current recipe to the savedRecipes array
      setSavedRecipes((prevSaved) => [...prevSaved, currentRecipe]);

    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorModal(true);
    }
    handleBeatIt();//remove from array and get new recipe to show anyway, tinder style
  }

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
    <Card className="col-5">
      <Card.Img
        variant="top"
        src={currentRecipe.recipe_image}
        alt={currentRecipe.recipe_name}
      />
      <Card.Body>
        <Card.Title>{currentRecipe.recipe_name}</Card.Title>
        <Card.Text>{currentRecipe.recipe_description}</Card.Text>
        <ul>
          {currentRecipe.recipe_ingredients.ingredient.map(
            (ingredient, index) => (
              <li key={index}>{ingredient}</li>
            )
          )}
        </ul>
        <div className="d-flex justify-content-between">
          <Button variant="danger" onClick={handleBeatIt}>
            Beat It
          </Button>
          <Button variant="success" onClick={handleEatIt}>
            Eat It
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}


// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState, useEffect } from "react";
// import { Button, Card } from "react-bootstrap";

// export default function EatItOrBeatIt(props) {
//   const { results } = props;
//   const [recipes, setRecipes] = useState(results); // Ensure results have a default value of an empty array
//   const [currentRecipe, setCurrentRecipe] = useState(null);
//   const [extraDetails, setExtraDetails] = useState(null);

//   // Function to pick a random recipe
//   const getRandomRecipe = () => {
//     if (recipes.length > 0) {
//       const randomIndex = Math.floor(Math.random() * recipes.length);
//       setCurrentRecipe(recipes[randomIndex]);
//     }
//   };

//   // Function to handle "Beat It" button click
//   const handleBeatIt = () => {
//     const updatedRecipes = recipes.filter(
//       (recipe) => recipe.recipe_id !== currentRecipe.recipe_id
//     );
//     setRecipes(updatedRecipes);
//     if (updatedRecipes.length > 0) {
//       getRandomRecipe();
//     } else {
//       setCurrentRecipe(null); // No more recipes left
//     }
//   };

//   async function handleEatIt() {
//     //!!! NEED TO GET THIS API CALL WORKING
//     console.log("Eat It clicked");
//     try {
//       const response = await fetch(
//         `/api/recipe/search/${currentRecipe.recipe_id}`, // Ensure `recipe_id` is being accessed correctly
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch extra details.");
//       }

//       const data = await response.json();
//       setExtraDetails(data); // Store results in state

//       if (!data || Object.keys(data).length === 0) {
//         // Check if the data object is empty
//         setErrorMessage(
//           "No more details found for this recipe. Did you send the ID correctly?"
//         );
//         setShowErrorModal(true);
//       }
//     } catch (error) {
//       setErrorMessage(error.message);
//       setShowErrorModal(true);
//     }
//     handleBeatIt();//remove from array and get new recipe to show anyway, tinder style
//   }

//   // Load a random recipe on first load of page
//   useEffect(() => {
//     if (recipes.length > 0) {
//       getRandomRecipe();
//     }
//   }, [recipes]);

//   // If no current recipe, return a message
//   if (!currentRecipe) {
//     return <div>No more recipes to display.</div>;
//   }

//   return (
//     <Card>
//       <Card.Img
//         variant="top"
//         src={currentRecipe.recipe_image}
//         alt={currentRecipe.recipe_name}
//       />
//       <Card.Body>
//         <Card.Title>{currentRecipe.recipe_name}</Card.Title>
//         <Card.Text>{currentRecipe.recipe_description}</Card.Text>
//         <ul>
//           {currentRecipe.recipe_ingredients.ingredient.map(
//             (ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             )
//           )}
//         </ul>
//         <div className="d-flex justify-content-between">
//           <Button variant="danger" onClick={handleBeatIt}>
//             Beat It
//           </Button>
//           <Button variant="success" onClick={handleEatIt}>
//             Eat It
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }
