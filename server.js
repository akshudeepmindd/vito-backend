'use strict';
require ('rootpath') ();
const express = require ('express');
const app = express ();
const helmet = require ('helmet');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const connectDB = require ('./config/dbconfig');
const Routes = require ('./routes');
const errorHanlder = require('./utils/GlobalErrorHandler');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./constants/swaggerSetup');
const swaggerSpec = swaggerJSDoc(swaggerOptions);
require ('dotenv').config ();

let port = process.env.PORT || 4000;

connectDB ();
app.use (helmet ());




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '20mb' }));

// API DOCS
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());

// API ROUTES
app.use ('/api/user', Routes.UserRoute);
app.use ('/api/package', Routes.PackageRoute);
app.use('/api/payments', Routes.PaymentRoute)

//ERROR HANDLER
app.use(errorHanlder);

app
  .listen (port, function () {
    console.log (`🚀 Listening at port ${port}`);
  })
  .on ('error', function (error) {
    console.log (error);
  });