'use strict';
const {Router} = require ('express');
const userController = require ('../controllers/users');
const router =  Router ();

router.post ('/register', userController.register);
router.post ('/login', userController.authenticate);
router.post('/verified', userController.emailVerifid)


module.exports = router;