const express = require('express');
const routes = express.Router();

const employeeRoutes = require('./employee.routes');

routes.use('/employee', employeeRoutes);

routes.get('/', function (req, res) {
  res.status(200);
  res.json({
    success: true,
    message: 'Welcome to the coolest API on the earth!',
  });
});

module.exports = routes;