const express = require('express');

const router = express.Router();
//for home
const homeController = require('../controllers/home_controllers');
const { route } = require('./users');


//for posts
// const postsController = require('../controllers/home_controllers')
// console.log('router loaded!');

router.get('/', homeController.home);
router.get('/posts', homeController.posts);
router.get('/friends', homeController.friends);
router.get('/sign-up', homeController.sign_up);
router.get('/log-in', homeController.log_in);
router.post('/create-account', homeController.create_account);

router.use('/user', require('./users'));

module.exports = router;