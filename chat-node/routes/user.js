var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth/authenticate')


router.post('/login',userController.login);

router.post('/register',userController.register);

router.get('/getUsers',auth.verifyToken,userController.getUsers);

router.get('/isOnline/:id',auth.verifyToken,userController.checkUserOnline);

module.exports = router;


