const express = require('express');
const passport = require('passport');
const router = express.Router();

const profile_controller = require('../controllers/profile_controller');

router.get('/update-profile/:id',passport.checkAuthentication ,profile_controller.update_profile);

router.post('/update-profile-ok/:id', passport.checkAuthentication, profile_controller.update_profile_ok);

module.exports = router;