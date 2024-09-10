import Comment from './Comment'

export default function SingleRecipe() {
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
            <div id="fullRecipeContainer" className='col-12'>
                <div id='topSection' className='row'>
                    <img className='img-thumbnail col-4'></img>
                    <div id="ingAndPrep" className='col-8'>

                    </div>
                </div>
                <div id="cookingSteps" className='col-12'>

                </div>

            </div>
            <Comment />
        </>

    )
}