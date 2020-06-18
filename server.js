const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// load ENV VARS
dotenv.config({ path: './config/config.env' });
// connect to database
connectDB();

// Route Files -- importing the file
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const app = express();

// Body Parser - so we dont get undefined
app.use(express.json());

// cookie parser
app.use(cookieParser());

// Dev logging middleware for morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// fileuploading
app.use(fileupload());

// set static folder for photo
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers -- define the route from the file
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

// Error handler init
app.use(errorHandler);

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
