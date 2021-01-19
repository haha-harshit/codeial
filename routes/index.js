const express = require('express');

const router = express.Router();
const passport = require('passport');

//for home
const homeController = require('../controllers/home_controllers');
const { route } = require('./users');
 

//for posts
// const postsController = require('../controllers/home_controllers')
// console.log('router loaded!');

router.get('/', homeController.home);
router.get('/sign-up', homeController.sign_up);
router.get('/log-in', homeController.log_in);
router.get('/log-out', homeController.log_out);
router.post('/create-account', homeController.create_account);

//use passport as a middleware to authenticate
// console.log('ye chl nhi rha');
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/log-in'}
), homeController.create_Session);

router.use('/user', require('./users'));
router.use('/posts', require('./posts'));

module.exports = router;