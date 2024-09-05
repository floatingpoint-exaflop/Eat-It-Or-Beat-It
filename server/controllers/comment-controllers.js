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