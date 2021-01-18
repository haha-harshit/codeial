const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controllers');

// homepage
router.get('/homepage', passport.checkAuthentication, usersController.homepage);

//profile
router.get('/profile', passport.checkAuthentication, usersController.profile);

// posts
router.get('/posts',passport.checkAuthentication, usersController.posts);

// friends
router.get('/friends', passport.checkAuthentication, usersController.friends);

//liked-pages
router.get('/liked-pages', passport.checkAuthentication, usersController.likes);

module.exports = router; 