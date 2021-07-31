const express = require('express');
const auth = require('../middlewares/Auth.js');
const {registerController, loginController,getUserInfoController ,allUsersController} = require('../controllers/userControllers');

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/current-user',auth, getUserInfoController);
router.get('/all-users', allUsersController);

module.exports = router;
