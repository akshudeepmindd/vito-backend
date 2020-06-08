'use strict';
require ('rootpath') ();
const express = require ('express');
const helmet = require ('helmet');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const connectDB = require ('./config/dbconfig');
const Routes = require ('./routes');
const errorHanlder = require('./utils/GlobalErrorHandler');
// const swaggerUi = require ('swagger-ui-express');
// const SwaggerDocument = require ('./swagger.json');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./constants/swaggerSetup');
const swaggerSpec = swaggerJSDoc(swaggerOptions);

require ('dotenv').config ();

let port = process.env.PORT || 4000;

const app = express ();

connectDB ();
app.use (helmet ());

// API DOCS
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '20mb' }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use ('/api/user', Routes.UserRoute);
app.use ('/api/package', Routes.PackageRoute);
app.use('/api/payment', Routes.PaymentRoute)

//ERROR HANDLER
app.use(errorHanlder);

app
  .listen (port, function () {
    console.log (`🚀 Listening at port ${port}`);
  })
  .on ('error', function (error) {
    console.log (error);
  });