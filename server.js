'use strict';
require ('rootpath') ();
const express = require ('express');
const helmet = require ('helmet');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const connectDB = require ('./config/dbconfig');
const Routes = require ('./routes');
// const swaggerUi = require ('swagger-ui-express');
// const SwaggerDocument = require ('./swagger.json');

require ('dotenv').config ();

let port = process.env.PORT || 4000;

const app = express ();

connectDB ();
app.use (helmet ());

app.use(cors())

app.use(bodyParser.json())

app.use ('/api/user', Routes.UserRoute);
app.use ('/api/package', Routes.PackageRoute);

app
  .listen (port, function () {
    console.log (`🚀 Listening at port ${port}`);
  })
  .on ('error', function (error) {
    console.log (error);
  });