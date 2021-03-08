const express = require('express');
const router = express.Router();
const passport = require('passport');

//for home
const homeController = require('../controllers/home_controllers');
const { route } = require('./users');

// basic initial routes
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

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/callback', passport.authenticate('google', {failureRedirect: '/log-in'}),homeController.create_Session)



// format --->> router.use('/route-name', require('./router_file'));
// importing other routes
router.use('/user', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));


router.use('/api', require('./api/index'));

// exporting routes
module.exports = router;