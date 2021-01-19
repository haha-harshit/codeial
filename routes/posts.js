const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts_controller');

router.post('/create-post', postsController.create_post);

module.exports = router;