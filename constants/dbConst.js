const envCheck = require ('./env');
require ('dotenv').config ();

let dbUrl;
if (envCheck ()) {
  dbUrl = process.env.MONGODB_CONNECTION;
} else {
	 dbUrl = process.env.MONGODB_CONNECTION ? process.env.MONGODB_CONNECTION : 'mongodb://localhost:27017/dDb';
}

exports.dbUrl = dbUrl;