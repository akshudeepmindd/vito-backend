'use strict';
const {Router} = require ('express');
const paymentController = require ('../controllers/payments');
const router =  Router ();
const middlewares = require('../middlewares/userAuth');

router.post ('/payment', paymentController.userPayment);


module.exports = router;