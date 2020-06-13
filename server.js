const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// load ENV VARS
dotenv.config({ path: './config/config.env' });
// connect to database
connectDB();

// Route Files -- importing the file
const bootcamps = require('./routes/bootcamps');
const app = express();

// Body Parser - so we dont get undefined
app.use(express.json());

//Dev logging middleware for morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers -- define the route from the file
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  // eslint-disable-next-line no-console
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`.red);

  //close server & exit process, 1=failure
  server.close(() => process.exit(1));
});
