const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create-post',passport.checkAuthentication, postsController.create_post);

// 2nd security check that user deleting the post is the owner of the post
router.get('/delete-post/:id',passport.checkAuthentication, postsController.delete_post);

module.exports = router;