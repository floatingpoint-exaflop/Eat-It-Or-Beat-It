// import user model

const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {

  getUsers: async function (req,res){
    try {
      const result =  await User.find({})
      res.json(result)
    } catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  },
  addSavedRecipe: async function (req, res) {
    try {
      // Find the user by ID and add the recipe to the savedRecipes array
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { savedRecipes: req.body.recipeId } }, // Ensure no duplicates are added
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  
  getCurrentUser: async function(req, res){
  // get a single user by either their id or their username

    try {
      const user = await User.findOne({ _id: req.params.userId })
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  createUser: async function (req, res) {
    console.log("create")

    let user
    try {
      user = await User.create(req.body);
    } catch (err) {
      console.log(err)
    }

    console.log(user)

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }

    try {
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Something is wrong!' });
    }
  },

  updateUser: async function (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );
      res.json({ message: "profile updated!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  login: async function ({ body }, res) {
    const user = await User.findOne({ username: body.username });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  addRecipeApi: async function (req, res) {
    try {
      const liked = await Recipe.create(req.res);
      res.json(liked);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getRecipes: async function (req, res){
    try{
      const all = await User.find({_id: req.body._id}).populate('Recipe');
      if(!all){
        return res.status(404).json({message: 'no recipes found'})
      }
      res.json(all);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getComments: async function (req, res) {
    try {
        const user = await User.findById(req.params.userId).populate('comments'); // Ensure you're using the correct param
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.comments); // Return only the comments array
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
};


//Routes needed from the user profile
// recipes that they have liked
// comments that they have made on recipes
// their user account
// login
// create an account

