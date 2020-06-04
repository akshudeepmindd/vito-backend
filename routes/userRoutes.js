'use strict';
const {Router} = require ('express');
const userController = require ('../controllers/users');
// const authToken = require ('../utils/authToken');
const router =  Router ();

router.post ('/register', userController.register);
router.post ('/login', userController.authenticate);
router.post('/verified', userController.emailVerifid)
// router.get ('/logout', userController.logout);
// router.post ('/request-reset', authController.requestResetPassword);
// router.post ('/reset-password', authController.resetPassword);

// router.put ('/update', authToken, authController.update);

module.exports = router;