'use strict';
const {Router} = require ('express');
const packageController = require ('../controllers/package');
const router =  Router ();
const middlewares = require('../middlewares/userAuth');

router.post ('/', middlewares.authCheck,packageController.createPackage);
router.get ('/', middlewares.authCheck, packageController.getAllPackage);
router.get('/:packageId', middlewares.authCheck, packageController.getPackage);
router.put('/:packageId', middlewares.authCheck, packageController.editPackage)
router.delete('/:packageId', middlewares.authCheck, packageController.removePackage)


module.exports = router;