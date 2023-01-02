const express = require('express');
const router = express.Router();

const postController = require("../Controller/PostController");

router.get('/', postController.getPosts);

router.post('/create', postController.createPost);

router.post('/update', postController.updatePost);

module.exports = router;
