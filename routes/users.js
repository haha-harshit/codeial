const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controllers');
//profile
router.get('/profile', usersController.profile);

//liked-pages
router.get('/liked-pages', usersController.likes);

//your-posts
router.get('/posts', usersController.posts);

module.exports = router;