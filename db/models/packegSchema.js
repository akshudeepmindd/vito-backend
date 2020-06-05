'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let packageSchema = new Schema (
  {    
    packageName:{
        type: String
    },
    cost:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);


let Package = mongoose.model ('package', packageSchema);
module.exports = Package;
