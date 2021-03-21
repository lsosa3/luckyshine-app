const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

router.post('/login', awaitHandlerFactory(userController.userLogin));

module.exports = router;