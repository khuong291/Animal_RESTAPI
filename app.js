const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const animalsRoutes = require('./api/routes/animals');

mongoose.connect(
  'mongodb://khuong291:' +
    process.env.MONGO_ATLAS_PW +
    '@animal-shard-00-00-nbagb.mongodb.net:27017,animal-shard-00-01-nbagb.mongodb.net:27017,animal-shard-00-02-nbagb.mongodb.net:27017/test?ssl=true&replicaSet=Animal-shard-0&authSource=admin'
);

app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use('/animals', animalsRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
