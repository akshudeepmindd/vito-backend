"use strict";
const { Router } = require("express");
const userController = require("../controllers/users");
const middlewares = require("../middlewares/userAuth");
const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.authenticate);
router.post("/verified", userController.emailVerifid);
router.get("/getUsers", middlewares.authCheck, userController.getUserList);

module.exports = router;
