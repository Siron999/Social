const express = require('express');
const auth = require('../middlewares/Auth.js');
const {getPosts,createPost,updatePost,deletePost,likePost} = require('../controllers/postController');

const router = express.Router();

router.get('/get-all',auth, getPosts);
// router.post('/login', loginController);
// router.get('/current-user',auth, getUserInfoController);
// router.get('/all-users', allUsersController);

module.exports = router;
