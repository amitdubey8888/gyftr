const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('./app/config');
const apiRoutes = require('./app/routes/routes');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 100,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose.connect(config.database, options);
mongoose.set('useFindAndModify', false);
app.set('superSecret', config.serverSecret);

app.use('/api', apiRoutes);

app.listen(port);
console.log('GYFTR is running on http://localhost:3000');