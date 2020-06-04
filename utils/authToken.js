'use strict';
const jwt = require ('jsonwebtoken');
require ('dotenv').config ();
let User = require ('../db/models/userSchema');
let authMid = require('./token')
const ResponseHandler = require ('../utils/helpers');

const mongoose = require ('mongoose');

module.exports = async function (req, res, next) {
  const {success, failure} = ResponseHandler (res);

  if (!req.header ('Authorization')) {
    failure ('Please make sure your request has an Authorization header', 401)
  }

  const token = req.header ('Authorization').replace ('Bearer ', '');
  const data = authMid.decodeJWT(token, process.env.TOKEN_SECRET)

  try {
    const user = await User.findOne ({_id: data.sub.id, token: token});
    if (!user) {
      throw new Error ();
    }
    req.user = user;
    console.log(req.user, "req.user")
    req.token = token;
    next ();
  } catch (error) {
    failure ('No valid token provided', 401)
  }


};
