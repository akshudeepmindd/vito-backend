const envCheck = require ('./env');
require ('dotenv').config ();

let dbUrl;
if (envCheck ()) {
  dbUrl = "mongodb://vito:vito1234@ds113855.mlab.com:13855/vito-database";
} else {
	 dbUrl = process.env.MONGODB_CONNECTION ? process.env.MONGODB_CONNECTION : 'mongodb://localhost:27017/dDb';
}

exports.dbUrl = dbUrl;