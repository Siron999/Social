const express = require('express');
const {adminAuth,isLoggedIn} = require('../middlewares/adminAuth.js');
const {loggedInController,loginController,loginViewController,logoutController} = require('../controllers/adminControllers.js');

const router = express.Router();

router.get('/login',isLoggedIn, loginViewController);
router.post('/login',isLoggedIn, loginController);
router.post('/logout',adminAuth, logoutController);
router.get('/logged-logs',adminAuth, loggedInController);

module.exports = router;
