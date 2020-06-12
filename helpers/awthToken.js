const JWT = require('jsonwebtoken');
const responseHelper = require('./response');
const jwthelper = require('./jwt')
const { JWT_SECRET, JWT_EXPIRE_TIME } = process.env;

const authToken = async (req, res, next) =>{
    if (!req.header ('Authorization')) {
        throw Error('Please make sure your request has an Authorization header.')
    }
    const token = req.header ('Authorization').replace ('Bearer ', '');
    const data = jwthelper.decryptToken(token, process.env.TOKEN_SECRET)
    try {
        const user = await User.findOne ({_id: data.sub.id, token: token});
        
    }catch(error){
        next(error)
    }
}

// 'use strict';
// const jwt = require ('jsonwebtoken');
// require ('dotenv').config ();
// let User = require ('../../db/models/userSchema');
// let Role = require ('../../db/models/rolesSchema');
// let authMid = require('./authMiddleWare')
// const ResponseHandler = require ('../../utils/helpers');

// const mongoose = require ('mongoose');

// module.exports = async function (req, res, next) {
//   const {success, failure} = ResponseHandler (res);

//   if (!req.header ('Authorization')) {
//     failure ('Please make sure your request has an Authorization header', 401)
//   }

//   const token = req.header ('Authorization').replace ('Bearer ', '');
//   const data = authMid.decodeJWT(token, process.env.TOKEN_SECRET)

//   try {
//     const user = await User.findOne ({_id: data.sub.id, token: token});

//     if (!user) {
//       throw new Error ();
//     }

//     req.user = user;
//     console.log(req.user, "req.user")
//     req.body.companyId = req.user.companyId ? req.user.companyId : '';
//     req.token = token;
//     next ();
//   } catch (error) {
//     failure ('No valid token provided', 401)
//   }


// };