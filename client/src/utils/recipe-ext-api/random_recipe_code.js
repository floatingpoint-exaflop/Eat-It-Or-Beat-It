

    function getRandomRecipe() {
        if (recipeSearchResults.length === 0) {
            console.error('No recipes available. Did you fetch first or was this just a dud search?');
            return null;
        }
        const randomIndex = Math.floor(Math.random() * recipeSearchResults.length);
        return recipeSearchResults[randomIndex];
    }

    const handleGetRandomRecipe = () => {
        const randomRecipe = getRandomRecipe();
        if (randomRecipe) {
            setcurrentEatOrBeat(randomRecipe);
            console.log("Randomly selected recipe:", randomRecipe);
        }
    };

    return (
        console.log("oink")
    );
