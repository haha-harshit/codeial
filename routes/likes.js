const express = require('express');
const passport = require('passport');

const router = express.Router();


const likesController = require('../controllers/likes_controllers');

router.get('/toggle', likesController.toggleLike);


module.exports = router;  