const express = require('express');
const dotenv = require('dotenv');

// Route Files -- importing the file
const bootcamps = require('./routes/bootcamps');

// load ENV VARS
dotenv.config({ path: './config/config.env' });

const app = express();

// Mount routers -- define the route from the file
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  // eslint-disable-next-line no-console
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
