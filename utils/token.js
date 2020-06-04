"use strict";
const jwt = require("jsonwebtoken");
const moment = require("moment");
require("dotenv").config();

module.exports = {
  /*
        |--------------------------------------------------------------------------
        | Login Required Middleware
        |--------------------------------------------------------------------------
        */
  ensureAuthenticated: (req, res, next) => {
    if (!req.header("Authorization")) {
      return res.status(401).send({
        message: "Please make sure your request has an Authorization header"
      });
    }
    var token = req.header("Authorization").split(" ")[1];
    var payload = null;
    try {
      payload = jwt.decode(token,'1231241');
    } catch (err) {
      return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Token has expired" });
    }
    req.user = payload.sub;
    next();
  },

  /*
         |--------------------------------------------------------------------------
         | Generate JSON Web Token
         |--------------------------------------------------------------------------
         */
  createJWT: user => {
    var payload = {
      sub: {id:user._id, email:user.email, userName:user.userName, role:user.role},
      iat: moment().unix(),
      exp: moment()
        .add(14, "days")
        .unix()
    };
    // console.log(sub)
    //it needs only two arg, one is payload the ID other is secret
    return jwt.sign(payload, '1231241');
  },
  decodeJWT(token) {
    return jwt.verify(token,'1231241');
  },
  isAllowed(token) {
    let decodedToken = jwt.verify(token,'1231241');
  }
};
