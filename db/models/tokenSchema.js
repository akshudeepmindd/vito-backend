'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let verifiedtokenSchema = new Schema (
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User' 
    },
    token: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now, 
        expires: 43200 
    }
  },
);


let Token = mongoose.model ('token', verifiedtokenSchema);
module.exports = Token;
