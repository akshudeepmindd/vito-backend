'use strict';
const {Router} = require ('express');
const packageController = require ('../controllers/package');
const router =  Router ();

router.post ('/', packageController.createPackage);
router.get ('/', packageController.getAllPackage);
router.get('/:packageId', packageController.getPackage);
router.put('/:packageId', packageController.editPackage)
router.delete('/:packageId', packageController.removePackage)


module.exports = router;