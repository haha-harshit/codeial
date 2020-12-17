const express = require('express');

const router = express.Router();
//for home
const homeController = require('../controllers/home_controllers');


//for posts
// const postsController = require('../controllers/home_controllers')
// console.log('router loaded!');

router.get('/', homeController.home);
router.get('/posts', homeController.posts);
router.get('/friends', homeController.friends);

router.use('/user', require('./users'));

module.exports = router;