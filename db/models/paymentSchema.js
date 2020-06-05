'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let paymentSchema = new Schema (
  {    
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    transactionId:{
        type:String
    },
    packageId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'package'
    }
  },
  {
    timestamps: true,
  }
);


let Payment = mongoose.model ('payment', paymentSchema);
module.exports = Payment;