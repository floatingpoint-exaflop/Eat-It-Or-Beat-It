// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getCurrentUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('comments');
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser(req, res) {
    const user = await User.create(req.res);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  async updateUser(req, res) {
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
  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
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
  async addRecipeApi (req,res) {
    try {
      const liked = await Recipe.create(req.res);
      res.json(liked);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};
