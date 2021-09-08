const express = require('express');
const auth = require('../middlewares/Auth.js');
const {loggedInController} = require('../controllers/logControllers');

const router = express.Router();

router.get('/logged-logs', loggedInController);

module.exports = router;
