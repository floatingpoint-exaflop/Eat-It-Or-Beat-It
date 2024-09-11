const router = require('express').Router();
const { addComment } = require('../../controllers/comment-controllers')

router.route('/').post(addComment);

module.exports = router