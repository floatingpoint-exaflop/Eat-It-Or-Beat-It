const { Comment } = require('../models');


module.exports = {
    async getComments (req, res) {
        try{
            const comment = await Comment.find({}).populate('users')
            res.json(comment);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleComment (req,res){
        try{
            const comment = await Comment.findOne( {_id: req.params.commentId} )
            if(!comment){
                return res.status(400).json({ message: 'No comment found!!' });
            }
            res.json(comment)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getCommentsByUser (req,res){
        try{
            const comment = await Comment.find( {_id: req.params.userId} )
            if(!comment){
                return res.status(400).json({ message: 'No comment found!!' });
            }
            res.json(comment)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getAllCommentsByRecipe (req,res){
        try{
            const comment = await Comment.findAll( {_id: req.params.recipeId} )
            if(!comment){
                return res.status(400).json({ message: 'No comment found!!' });
            }
            res.json(comment)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addComment (req, res) {
        try{
            const comment = await Comment.create(req.res);
            res.json(comment);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}