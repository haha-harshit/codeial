const express = require('express');
const { use } = require('passport');
const passport = require('passport');
const { pass } = require('../config/mongoose');
const router = express.Router();

router.use('/profile', require('./profile'));


const usersController = require('../controllers/users_controllers');

// homepage
router.get('/homepage', passport.checkAuthentication, usersController.homepage);

//profile
router.get('/profile', passport.checkAuthentication, usersController.profile);

// friend's profile
router.get('/friends-profile/:id', usersController.friends_profile);

// edit-profile


// posts
router.get('/posts',passport.checkAuthentication, usersController.posts);

// friends
router.get('/friends', passport.checkAuthentication, usersController.friends);

//liked-pages
router.get('/liked-pages', passport.checkAuthentication, usersController.likes);



module.exports = router; 